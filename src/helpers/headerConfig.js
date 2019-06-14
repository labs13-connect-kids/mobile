import HeaderTitle from "./../components/HeaderTitle";
import logoImg from "../../assets/simple-logo.png";
import { Image, Platform, TouchableWithoutFeedback } from "react-native";
import { Icon } from "native-base";
import React from "react";

export default (headerConfig = (title, navigation) => {
  return {
    headerTitle: <HeaderTitle title={title} />,
    headerLeft:
      Platform.OS === "ios" ? (
        <Image
          source={logoImg}
          style={{ width: 40, height: 40, marginHorizontal: 20 }}
          resizeMode="contain"
        />
      ) : null,
    headerRight: (
      <TouchableWithoutFeedback
        onPress={() => {
          navigation.toggleDrawer();
        }}
      >
        <Icon
          ios="ios-menu"
          android="md-menu"
          style={{ fontSize: 40, color: "#000", paddingRight: 20 }}
        />
      </TouchableWithoutFeedback>
    )
  };
});
