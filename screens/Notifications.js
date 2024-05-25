import {StyleSheet, View, Animated, Image} from 'react-native';
import React, {useState, useRef,useEffect} from 'react';
import {
  Colors,
  CommonStyles,
  Fonts,
  Sizes,
  screenWidth,
} from '../constants/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Text} from '../components/commonText';
import {SwipeListView} from 'react-native-swipe-list-view';
import {Snackbar} from 'react-native-paper';
import MyStatusBar from '../components/myStatusBar';






const NotificationsScreen = ({navigation}) => {
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [listData, setListData] = useState([]);
  const animationIsRunning = useRef(false);
  const rowTranslateAnimatedValues = {};
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    Array(listData.length + 1)
    .fill('')
    .forEach((_, i) => {
      rowTranslateAnimatedValues[`${i}`] = new Animated.Value(1);
    });
  }, [listData]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://soulsyncadmin-production.up.railway.app/soulsync/getallnotifications');
      const data = await response.json();
      console.log('Notifications Data:', data);
      setListData(data.allNotifications);
       
      
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };



  return (
    <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
      <MyStatusBar />
      <View style={{flex: 1}}>
        {header()}
        {listData.length == 0 ? noNotificationInfo() : notificationsInfo()}
      </View>
      {snackBar()}
    </View>
  );

  function noNotificationInfo() {
    return (
      <View style={styles.noNotificationWrapStyle}>
        <Image
          source={require('../assets/save.png')}
          style={{width: 100.0, height: 100.0, resizeMode: 'contain'}}
        />
        <Text
          style={{
            ...Fonts.blackColor19SemiBold,
            marginTop: Sizes.fixPadding * 2.0,
          }}>
          No notifications yet
        </Text>
        <Text
          style={{
            marginVertical: Sizes.fixPadding,
            ...Fonts.grayColor16Regular,
            textAlign: 'center',
          }}>
          Stay tuned! Notifications about your activity will how up here.
        </Text>
      </View>
    );
  }

  function snackBar() {
    return (
      <Snackbar
        style={{backgroundColor: Colors.blackColor}}
        elevation={0}
        visible={showSnackBar}
        onDismiss={() => setShowSnackBar(false)}>
        <Text style={{...Fonts.whiteColor14Medium}}>
          Notification Dismissed!
        </Text>
      </Snackbar>
    );
  }

  function notificationsInfo() {
    const onSwipeValueChange = swipeData => {
      const {key, value} = swipeData;
      if (
        value > screenWidth ||
        (value < -screenWidth && !animationIsRunning.current)
      ) {
        animationIsRunning.current = true;
        Animated.timing(rowTranslateAnimatedValues[key], {
          toValue: 0,
          duration: 200,
          useNativeDriver: false,
        }).start(() => {
          const newData = [...listData];
          const prevIndex = listData.findIndex(item => item.key === key);
          newData.splice(prevIndex, 1);
          setListData(newData);
          setShowSnackBar(true);
          animationIsRunning.current = false;
        });
      }
    };

    const renderItem = data => (
      <View>
        <View style={{flex: 1, backgroundColor: Colors.whiteColor}}>
          <View style={{marginHorizontal: Sizes.fixPadding * 2.0}}>
            <View style={{flexDirection: 'row'}}>
              <View
                style={{
                  ...styles.iconWrapStyle,
                  backgroundColor: 'rgba(15, 52, 96, 0.1)',
                }}>
                <MaterialCommunityIcons
                  name="bell-badge"
                  size={28}
                  color={Colors.primaryColor}
                />
              </View>
              <View style={{flex: 1, marginLeft: Sizes.fixPadding + 5.0}}>
                <Text numberOfLines={1} style={{...Fonts.blackColor18Medium}}>
                  {data.item.title}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    marginTop: Sizes.fixPadding - 5.0,
                    ...Fonts.grayColor15Regular,
                  }}>
                  {data.item.description}
                </Text>
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.lightGrayColor,
                height: 1.0,
                marginVertical: Sizes.fixPadding * 2.0,
              }}
            />
          </View>
        </View>
      </View>
    );

    const renderHiddenItem = () => <View style={styles.rowBack} />;

    return (
      <SwipeListView
        data={listData}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-screenWidth}
        leftOpenValue={screenWidth}
        onSwipeValueChange={onSwipeValueChange}
        useNativeDriver={false}
        contentContainerStyle={{paddingTop: Sizes.fixPadding - 5.0}}
        showsVerticalScrollIndicator={false}
      />
    );
  }

  function header() {
    return (
      <View
        style={{
          margin: Sizes.fixPadding * 2.0,
          justifyContent: 'center',
        }}>
        <MaterialIcons
          name="keyboard-backspace"
          size={26}
          color={Colors.primaryColor}
          style={{position: 'absolute', zIndex: 100,top:-3}}
          onPress={() => {
            navigation.pop();
          }}
        />
        <Text style={styles.headerText}>Notifications</Text>
      </View>
    );
  }
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  noNotificationWrapStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Sizes.fixPadding * 4.0,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: Colors.primaryColor,
    flex: 1,
    marginBottom: Sizes.fixPadding * 2.0,
  },
  iconWrapStyle: {
    width: 60.0,
    height: 60.0,
    borderRadius: 30.0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
        
    ...Fonts.primaryColor20Bold,
      textAlign: 'center',
      marginBottom: Sizes.fixPadding+10,
    }
});
