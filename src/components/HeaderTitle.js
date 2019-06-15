import React from "react";
import { View, Text, Image, Platform, StyleSheet } from "react-native";
import logoImg from "../../assets/simple-logo.png";

const HeaderTitle = ({ title }) => (
  // title should be the string of the components name
  <View style={{ flexDirection: "row" }}>
    {/* on android the text renders left aligned and therefore we put the logo next to it, ios renders centered */}
    {Platform.OS === "android" ? (
      <Image
        source={logoImg}
        style={{ width: 40, height: 40, marginHorizontal: 10 }}
        resizeMode="contain"
      />
    ) : null}
    <Text style={styles.text}>{`Connect Our Kids \n${title}`}</Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    color: "rgb(80,141,179)",
    fontSize: 18,
    fontWeight: "bold"
  }
});

export default HeaderTitle;
