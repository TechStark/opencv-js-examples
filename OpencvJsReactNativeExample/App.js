/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import cv from '@techstark/opencv-js';

const App = () => {
  const [buildInfo, setBuildInfo] = useState(null);

  useEffect(() => {
    const handle = setTimeout(() => {
      const info = cv.getBuildInformation();
      setBuildInfo(info);
    }, 1000);

    return () => {
      clearTimeout(handle);
    };
  }, []);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <Text>{buildInfo}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
