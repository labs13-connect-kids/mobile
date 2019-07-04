import React from 'react';
import { Platform, StyleSheet, View, WebView } from 'react-native';

const Video = ({ uri }) => {
  return (
    <View style={styles.videoContainer}>
      <WebView
        style={styles.WebViewContainer}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'center',
    height: 300,
    marginBottom: 30
  },
  WebViewContainer: {
    marginTop: Platform.OS == 'ios' ? 20 : 0
  }
});

export default Video;
