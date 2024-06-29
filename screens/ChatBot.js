import {
  StyleSheet,
  View,
  Image,
  FlatList,
  TextInput,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import React, { useState } from 'react';
import { Text } from '../components/commonText';
import { Colors, Fonts, Sizes, screenWidth } from '../constants/styles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyStatusBar from '../components/myStatusBar';
import { GoogleGenerativeAI } from "@google/generative-ai";
import Markdown from 'react-native-markdown-display';

const userMessages = [
  {
    id: '1',
    message:
      'Hello, Dear , Do You need help?. I am here for you. Please let me know how I can assist you today?',
    isSender: false,
  },
  {
    id: '2',
    message: 'Oky',
    isSender: true,
  },
];

const MessageScreen = ({ navigation }) => {
  const [messagesList, setMessagesList] = useState(userMessages);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const API_KEY = "AIzaSyDoVKDEYFPv1Z5I7unogz6PVhAZtr2yylY";
  const genAI = new GoogleGenerativeAI(API_KEY);

  async function addMessage({ message }) {
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const AmPm = hour >= 12 ? 'pm' : 'am';
    const finalHour = hour > 12 ? hour - 12 : hour;
    const displayHour = finalHour.toString().padStart(2, '0');
    const displayMinute = minute.toString().padStart(2, '0');

    const newMessage = {
      id: messagesList.length + 1,
      message: message,
      messageTime: `${displayHour}:${displayMinute} ${AmPm}`,
      isSender: true,
    };

    setMessagesList(prevMessages => [...prevMessages, newMessage]);
    setMessage('');
    setLoading(true);

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(message);
      const response = result.response;
      const generatedMessage = response.text();

      const generatedResponse = {
        id: newMessage.id + 1,
        message: generatedMessage,
        messageTime: `${displayHour}:${displayMinute} ${AmPm}`,
        isSender: false,
      };

      setMessagesList(prevMessages => [...prevMessages, generatedResponse]);
    } catch (error) {
      console.error('Error generating message:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior="height"
      style={{ flex: 1 }}
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardVerticalOffset={0}>
      <View style={{ flex: 1, backgroundColor: Colors.whiteColor }}>
        <MyStatusBar />
        <View style={{ flex: 1 }}>
          {header()}
          {renderMessages()}
        </View>
        {typeMessage()}
      </View>
    </KeyboardAvoidingView>
  );

  function header() {
    return (
      <View style={styles.headerWrapStyle}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <MaterialIcons
            name="keyboard-backspace"
            size={26}
            color={Colors.blackColor}
            onPress={() => {
              navigation.pop();
            }}
            style={{ marginRight: Sizes.fixPadding * 2.0 }}
          />
          <Image
            source={require('../assets/soulsync.jpg')}
            style={{ width: 46.0, height: 46.0, borderRadius: 23.0 }}
          />
          <View style={{ flex: 1, marginHorizontal: Sizes.fixPadding + 2.0 }}>
            <Text style={{ ...Fonts.blackColor19SemiBold }}>SoulSync</Text>
            <Text style={{ ...Fonts.grayColor16Regular }}>Online</Text>
          </View>
        </View>
        <MaterialIcons name="more-vert" size={26} color={Colors.blackColor} />
      </View>
    );
  }

  function renderMessages() {
    const renderItem = ({ item }) => {
      return (
        <View
          style={{
            alignItems: item.isSender ? 'flex-end' : 'flex-start',
            marginHorizontal: Sizes.fixPadding * 2.0,
            marginVertical: Sizes.fixPadding - 2.0,
          }}>
          <View
            style={{
              ...styles.messageWrapStyle,
              backgroundColor: item.isSender
                ? Colors.primaryColor
                : Colors.extraLightGrayColor,
            }}>
            <Text
              style={
                item.isSender
                  ? { ...Fonts.whiteColor16Regular }
                  : { ...Fonts.grayColor16Regular }
              }>
              {item.message}
            </Text>
          </View>
        </View>
      );
    };
    return (
      <View style={{ flex: 1 }}>
        {loading && (
          <ActivityIndicator size="large" color={Colors.primaryColor} />
        )}
        <FlatList
          inverted
          data={messagesList}
          keyExtractor={item => `${item.id}`}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            flexDirection: 'column-reverse',
            paddingBottom: Sizes.fixPadding * 2.0,
            paddingTop: Sizes.fixPadding * 2.0,
          }}
        />
      </View>
    );
  }

  function typeMessage() {
    return (
      <View style={styles.typeMessageWrapStyle}>
        <TextInput
          cursorColor={Colors.primaryColor}
          selectionColor={Colors.primaryColor}
          value={message}
          onChangeText={setMessage}
          placeholder="Write a message..."
          style={styles.messageFieldStyle}
          placeholderTextColor={Colors.grayColor}
        />
        <MaterialIcons
          name="send"
          size={20}
          color={Colors.primaryColor}
          style={{ marginLeft: Sizes.fixPadding - 5.0 }}
          onPress={() => {
            if (message != '') {
              addMessage({ message: message });
            }
          }}
        />
      </View>
    );
  }
};

export default MessageScreen;

const styles = StyleSheet.create({
  headerWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: Sizes.fixPadding * 2.0,
  },
  typeMessageWrapStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.extraLightGrayColor,
    borderRadius: Sizes.fixPadding,
    marginHorizontal: Sizes.fixPadding * 2.0,
    marginBottom: Sizes.fixPadding * 2.0,
    paddingHorizontal: Sizes.fixPadding + 2.0,
    paddingVertical: Sizes.fixPadding + 3.0,
  },
  messageWrapStyle: {
    padding: Sizes.fixPadding,
    borderRadius: Sizes.fixPadding,
    maxWidth: screenWidth - 90.0,
  },
  messageFieldStyle: {
    flex: 1,
    ...Fonts.grayColor16Regular,
    marginRight: Sizes.fixPadding,
    padding: 0,
  },
});
