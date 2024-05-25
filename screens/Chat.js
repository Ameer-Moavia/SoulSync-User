import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { Text } from "../components/commonText";
import { Fonts, Colors, Sizes } from "../constants/styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import MyStatusBar from "../components/myStatusBar";

 const chatsList = [
    {
      id: "1",
      sourceImage: require("../assets/1.jpeg"), // Male image
      sourceName: "Dr. John Doe",
      message: "Hello, Samantha",
      lastMsgTime: "10:22 am",
      unreadMsgCount: 5,
    },
    {
      id: "2",
      sourceImage: require("../assets/4.jpeg"), // Female image
      sourceName: "Dr. Jane Smith",
      message: "Welcome!",
      lastMsgTime: "10:16 am",
    },
    {
      id: "3",
      sourceImage: require("../assets/3.jpeg"), // Male image
      sourceName: "Dr. Alex Johnson",
      message: "Oky...!",
      lastMsgTime: "10:00 am",
    },
    {
      id: "4",
      sourceImage: require("../assets/2.jpeg"), // Female image
      sourceName: "Dr. Emily Brown",
      message: "Congratulations!",
      lastMsgTime: "1 days ago",
    },
    {
      id: "5",
      sourceImage: require("../assets/1.jpeg"), // Male image
      sourceName: "Dr. Michael Williams",
      message: "Welcome!",
      lastMsgTime: "1 days ago",
    },
    {
      id: "6",
      sourceImage: require("../assets/4.jpeg"), // Female image
      sourceName: "Dr. Sarah Anderson",
      message: "Send me your resume samanatha",
      lastMsgTime: "2 days ago",
    },
    {
      id: "7",
      sourceImage: require("../assets/3.jpeg"), // Male image
      sourceName: "Dr. William Johnson",
      message: "Grate !",
      lastMsgTime: "2 days ago",
    },
  ];

const ChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chatsList.filter(chat =>
    chat.sourceName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function chatsInfo() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          navigation.push("Message",item);
        }}
        style={styles.chatInfoWrapStyle}
      >
        <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
          <Image source={item.sourceImage} style={styles.sourceImageStyle} />
          <View
            style={{
              flex: 1,
              marginLeft: Sizes.fixPadding + 5.0,
              marginRight: Sizes.fixPadding,
            }}
          >
            <Text
              numberOfLines={1}
              style={{
                ...Fonts.blackColor18SemiBold,
                marginBottom: Sizes.fixPadding - 5.0,
              }}
            >
              {item.sourceName}
            </Text>
            <Text
              numberOfLines={1}
              style={
                item.unreadMsgCount
                  ? { ...Fonts.blackColor15Regular }
                  : { ...Fonts.grayColor15Regular }
              }
            >
              {item.message}
            </Text>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text style={{ ...Fonts.grayColor14Regular }}>
            {item.lastMsgTime}
          </Text>
          {item.unreadMsgCount ? (
            <View style={styles.unreadMsgCountWrapper}>
              <Text style={{ ...Fonts.whiteColor14Medium }}>
                {item.unreadMsgCount}
              </Text>
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
    return (
      <FlatList
        data={filteredChats}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        automaticallyAdjustKeyboardInsets={true}
        contentContainerStyle={{ paddingTop: Sizes.fixPadding * 1.4 }}
      />
    );
  }

  function searchField() {
    return (
      <View style={styles.searchFieldWrapper}>
        <MaterialIcons name="search" color={Colors.grayColor} size={20} />
        <TextInput
          placeholder="Search Here"
          placeholderTextColor={Colors.grayColor}
          style={styles.searchFieldStyle}
          cursorColor={Colors.primaryColor}
          onChangeText={(text) => setSearchQuery(text)}
          value={searchQuery}
        />
      </View>
    );
  }

  function header() {
    return (
      <Text
        style={styles.headerText}
      >
        Chats
      </Text>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
      <MyStatusBar />
      <View style={{ flex: 1 }}>
        {header()}
        {searchField()}
        {chatsInfo()}
      </View>
    </View>
  );
};
 const styles = StyleSheet.create({
    searchFieldWrapper: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: Colors.extraLightGrayColor,
      padding: Sizes.fixPadding + 2.0,
      borderRadius: Sizes.fixPadding,
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginTop: Sizes.fixPadding - 5.0,
      marginBottom: Sizes.fixPadding,
    },
    
    headerText: {
        ...Fonts.primaryColor20Bold,
          textAlign: 'center',
          marginVertical: Sizes.fixPadding+10,
        },
    searchFieldStyle: {
      ...Fonts.grayColor16Regular,
      flex: 1,
      marginHorizontal: Sizes.fixPadding,
      includeFontPadding: false,
      padding:0
    },
    unreadMsgCountWrapper: {
      width: 24.0,
      height: 24.0,
      borderRadius: 12.0,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: Colors.primaryColor,
      overflow: "hidden",
      marginTop: Sizes.fixPadding - 5.0,
    },
    sourceImageStyle: {
      width: 50.0,
      height: 50.0,
      borderRadius: 25.0,
      resizeMode: "contain",
    },
    chatInfoWrapStyle: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: Sizes.fixPadding * 2.0,
      marginBottom: Sizes.fixPadding * 2.4,
    },
  });

export default ChatScreen;