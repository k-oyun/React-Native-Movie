import AppLoading from "expo-app-loading";
import React, {useState} from "react";
import * as Font from "expo-font";
import {Text, Image, useColorScheme} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {Asset} from "expo-asset";
import {NavigationContainer} from "@react-navigation/native";
import Tabs from "./navigation/Tabs";
import Stack from "./navigation/Stack";
import Root from "./navigation/Root";
import {ThemeProvider} from "styled-components/native";
import {darkTheme, lightTheme} from "./styled";

const loadFonts = (fonts) => fonts.map((font) => Font.loadAsync(font));

export default function App() {
  //apploading은 로딩이 끝날때까지 splash screen을 보여준다
  const [ready, setReady] = useState(false);

  //로딩이 끝나는 경우
  const onFinish = () => setReady(true);

  //로딩중인 경우 무엇을 할건지
  const startLoading = async () => {
    const fonts = loadFonts([Ionicons.font]);
    await Promise.all([...fonts]);
  };

  const isDark = useColorScheme() === "dark";

  //not ready state
  if (!ready) {
    return (
      <AppLoading
        onFinish={onFinish}
        startAsync={startLoading}
        onError={console.error}
      />
    );
  }

  //ready state
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
