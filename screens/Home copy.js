import * as React from "react";
import { StyleSheet, View,Text,Image, TouchableOpacity } from "react-native";
import { FontFamily, FontSize, Color, Border, Padding } from "../GlobalStyles";

import { useNavigation } from '@react-navigation/native';

const Home = () => {
  
  const navigation = useNavigation();
  return (
    <View style={styles.home}>
      <View style={[styles.writing, styles.writingLayout]}>
        <View >
          <TouchableOpacity style={[styles.allCards, styles.writingLayout]}>
          <View style={[styles.card1, styles.cardPosition]}>
            <View style={[styles.bg, styles.bgLayout]} />
            <Image
            style={[styles.vectorIcon1, styles.iconLayout3]}
            contentFit="cover"
            source={require("../assets/vector.png")}
          />
            <Text style={[styles.heading, styles.headingTypo1]}>
              Book Session
            </Text>
          </View>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.card2, styles.cardPosition]}>
            <View style={[styles.bg1, styles.bgLayout]} />
            <Text style={[styles.heading1, styles.headingTypo1]}>
              Test Reports
            </Text>
            <View style={[styles.innerBox, styles.innerLayout]}>
              <View style={[styles.innerBoxChild, styles.innerLayout]} />
              <Image
                style={[styles.mdiperformanceIcon, styles.iconLayout1]}
                contentFit="cover"
                source={require("../assets/mdiperformance.png")}
              />
            </View>
          </TouchableOpacity>
          
        </View>
      </View>
      <TouchableOpacity style={styles.bg2} onClick={() => {}}>
      <Image
        style={[styles.materialSymbolsnotificationsIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/materialsymbolsnotifications.png")}
      />
      <Text style={[styles.heading2, styles.headingTypo1]}>
        Scheduled Sessions
      </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.tablermessageChatbot} onClick={() => {}}>
        <Image
          style={[styles.icon3, styles.iconLayout2]}
          contentFit="cover"
          source={require("../assets/tablermessagechatbot.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonPrimaryWrapper, styles.buttonLayout1]}
        onClick={() => {}}
      >
        <View style={[styles.buttonPrimary, styles.buttonFlexBox]}>
          
      <Image
        style={[styles.carbontestToolIcon, styles.iconLayout]}
        contentFit="cover"
        source={require("../assets/carbontesttool.png")}
      />
        <Text style={[styles.heading4, styles.headingTypo]}>Perform Test</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonPrimaryParent, styles.buttonLayout]}
        onClick={() => {}}
      >
        <View style={[styles.buttonPrimary1, styles.buttonLayout]}>
        <Text style={[styles.heading6, styles.headingTypo]}>Watch Videos</Text>
        </View>
        <Image
          style={[styles.bxsvideosIcon, styles.iconLayout1]}
          contentFit="cover"
          source={require("../assets/bxsvideos.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonPrimaryContainer, styles.buttonLayout1]} onPress={()=>{navigation.navigate('Notifications')}} >
      <Image
        style={[styles.vectorIcon, styles.iconLayout3]}
        contentFit="cover"
        source={require("../assets/vector.png")}
      />
        <View style={[styles.buttonPrimary, styles.buttonFlexBox]}>
      <Text style={[styles.heading3, styles.headingTypo]}>
        Psychologist Feedback
      </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttonPrimaryFrame, styles.buttonLayout1]}
        onClick={() => {}}
      >
        <View style={[styles.buttonPrimary, styles.buttonFlexBox]}>
        <Image
        style={[styles.uilfeedbackIcon]}
        contentFit="cover"
        source={require("../assets/uilfeedback.png")}
      />
      
      <Text style={[styles.heading5, styles.headingTypo]}>
        Write Feedback
      </Text>
         </View>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  iconLayout3: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  saveLayout: {
    height: "29.58%",
    width: "5.59%",
    position: "absolute",
  },
  iconLayout2: {
    height: "100%",
    width: "100%",
  },
  wrapperFlexBox: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  videoLayout: {
    transform: [
      {
        scale: 1.167,
      },
    ],
    objectFit: "contain",
    height: "100%",
    position: "absolute",
    width: "100%",
  },
  home1Typo: {
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  settings1Typo: {
    top: 43,
    textAlign: "center",
    color: Color.colorWhite,
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
    position: "absolute",
  },
  writingLayout: {
    height: 209,
    width: 366,
    position: "absolute",
  },
  cardPosition: {
    height: 202,
    top: 0,
    position: "absolute",
  },
  bgLayout: {
    width: 151,
    borderRadius: Border.br_mid,
    height: 202,
    left: 0,
    top: 0,
    position: "absolute",
  },
  headingTypo1: {
    textAlign: "left",
    color: Color.colorBlack,
    lineHeight: 20,
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    alignItems: "center",
    display: "flex",
    position: "absolute",
  },
  innerLayout: {
    height: 66,
    width: 66,
    position: "absolute",
  },
  iconLayout1: {
    width: 47,
    overflow: "hidden",
  },
  wrapperVideoLayout: {
    height: 24,
    width: 24,
  },
  buttonLayout1: {
    height: 56,
    width: 353,
    position: "absolute",
  },
  buttonFlexBox: {
    paddingVertical: Padding.p_mid,
    paddingHorizontal: Padding.p_133xl,
    flexDirection: "row",
    backgroundColor: Color.colorDarkturquoise_100,
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonLayout: {
    height: 80,
    width: 247,
    position: "absolute",
  },
  headingTypo: {
    width: 221,
    left: 25,
    textAlign: "left",
    color: Color.colorBlack,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    lineHeight: 20,
    fontSize: FontSize.size_lg,
    alignItems: "center",
    display: "flex",
    height: 44,
  },
  heading5Position: {
    top: 6,
    position: "absolute",
  },
  iconLayout: {
    height: 32,
    width: 32,
    position: "absolute",
    overflow: "hidden",
  },
  fluentpersonFeedback48Regu: {
    top: 495,
    left: 305,
    width: 48,
    height: 48,
    position: "absolute",
    overflow: "hidden",
  },
  vectorIcon: {
    height: "63%",
    width: "11%",
    top:10,
    right:10,
    position: "absolute",
  },
  homeChild: {
    top: 47,
    left: 320,
    width: 46,
    height: 44,
    position: "absolute",
  },
  icon: {
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  save: {
    left: "71.28%",
    top: "16.9%",
    right: "23.14%",
    bottom: "53.52%",
  },
  homeIcon: {
    top: "21.13%",
    right: "89.36%",
    bottom: "49.3%",
    left: "5.05%",
    maxHeight: "100%",
    maxWidth: "100%",
    overflow: "hidden",
  },
  video: {
    left: -2,
    top: 0,
  },
  wrapperVideo: {
    left: 188,
    height: 24,
    width: 24,
    top: 16,
  },
  settings: {
    left: 2,
    top: 1,
  },
  wrapperSettings: {
    left: "87.23%",
    top: "14.08%",
    right: "6.97%",
    bottom: "55.92%",
    width: "5.8%",
    height: "30%",
  },
  records: {
    top:20,
    left: 10,
    color: Color.colorWhite,
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
  },
  notification: {
    left: 72,
  },
  home1: {
    top: 41,
    color: "#3f3f3f",
    left: 19,
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
  },
  profile: {
    top: 44,
    left: 261,
    color: Color.colorWhite,
    textAlign: "center",
    fontFamily: FontFamily.robotoMedium,
    fontWeight: "500",
    fontSize: FontSize.size_xs,
  },
  settings1: {
    left: 317,
  },
  icon3: {
    overflow: "hidden",
  },
  tdesignnotification: {
    left: 93,
    top: 17,
    width: 21,
    height: 21,
    position: "absolute",
  },
  view: {
    marginLeft: -188.5,
    top: 765,
    left: "50%",
    borderRadius: 20,
    backgroundColor: "#17c3ce",
    width: 376,
    height: 71,
    position: "absolute",
    overflow: "hidden",
  },
  bg: {
    backgroundColor: Color.colorMistyrose,
  },
  heading: {
    width: 164,
    top: 148,
    textAlign: "left",
    color: Color.colorBlack,
    lineHeight: 20,
    fontSize: FontSize.size_lg,
    left: 19,
  },
  card1: {
    width: 183,
    left: 0,
  },
  bg1: {
    backgroundColor: "rgba(23, 195, 206, 0.23)",
  },
  heading1: {
    width: 153,
    top: 148,
    textAlign: "left",
    color: Color.colorBlack,
    lineHeight: 20,
    fontSize: FontSize.size_lg,
    left: 19,
  },
  innerBoxChild: {
    borderRadius: 12,
    backgroundColor: "rgba(23, 195, 206, 0.4)",
    left: 25,
    top: 0,
  },
  mdiperformanceIcon: {
    left: 32,
    height: 53,
    top: 0,
    position: "absolute",
  },
  innerBox: {
    top: 26,
    left: 19,
  },
  card2: {
    left: 190,
    width: 172,
  },
  vectorIcon1: {
    height: "31.62%",
    width: "30%",
    top: "16.64%",
    right: "70.49%",
    bottom: "51.74%",
    left: "25%",
    position: "absolute",
  },
  allCards: {
    left: 0,
    top: 0,
  },
  writing: {
    top: 194,
    left: 17,
  },
  bg2: {
    top: 121,
    left: 29,
    width: 321,
    height: 60,
    backgroundColor: Color.colorMistyrose,
    borderRadius: Border.br_mid,
    position: "absolute",
  },
  heading2: {
    top: 22,
    left: 38,
    width: 270,
    height: 45,
  },
  mdivirtualMeeting: {
    top: 679,
    left: 23,
    position: "absolute",
    overflow: "hidden",
  },
  tablermessageChatbot: {
    left: 290,
    top: 660,
    width: 83,
    height: 74,
    position: "absolute",
  },
  button: {
    fontSize: FontSize.size_base,
    lineHeight: 20,
    fontFamily: FontFamily.interSemiBold,
    fontWeight: "600",
    textAlign: "center",
    color: Color.colorWhite,
  },
  buttonPrimary: {
    height: 56,
    width: 353,
    position: "absolute",
  },
  buttonPrimaryWrapper: {
    top: 467,
    left: 13,
    width: 353,
  },
  buttonPrimary1: {
    flexDirection: "row",
    backgroundColor: Color.colorDarkturquoise_100,
    borderRadius: Border.br_3xs,
    left: 0,
    top: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  bxsvideosIcon: {
    left: 183,
    height: 47,
    top: 16,
    position: "absolute",
  },
  buttonPrimaryParent: {
    top: 662,
    left: 17,
  },
  buttonPrimaryContainer: {
    top: 530,
    left: 13,
    width: 353,
  },
  buttonPrimaryFrame: {
    top: 593,
    left: 17,
  },
  heading3: {
    top: 20,
    position: "absolute",
  },
  heading4: {
    top: 20,
    position: "absolute",
  },
  heading5: {
    top: 20,
    position: "absolute",
  },
  heading6: {
    top: 30,
    position: "absolute",
  },
  uilfeedbackIcon: {
    right:10,
    height: 30,
    width: 35,
    position:'absolute',
    overflow: "hidden",
  },
  carbontestToolIcon: {
    top: 10,
    right: 10,
  },
  materialSymbolsnotificationsIcon: {
    top: 13,
    right:10
  },
  home: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    height: 852,
    overflow: "hidden",
    width: "100%",
  },
});

export default Home;
