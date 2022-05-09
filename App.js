import * as SplashScreen from "expo-splash-screen";
import React, { useState, useCallback } from "react";
import { useColorScheme } from "react-native";
import { useAssets } from "expo-asset";
import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./navigation/Root";
import { ThemeProvider } from "styled-components/native";
import { darkTheme, lightTheme } from "./styled";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [assets] = useAssets([require("./image01.jpeg")]);
  const [loaded] = Font.useFonts(Ionicons.font);
  const isDark = useColorScheme() === "dark";
  // useEffect(() => {
  //   // 스플래쉬 스크린 중 데이터를 가져오는 구간
  //   async function prepare() {
  //     try {
  //       if (!assets || !loaded) {
  //         await SplashScreen.preventAutoHideAsync();
  //       }
  //       // fetch data...
  //     } catch (e) {
  //       console.error(e);
  //     } finally {
  //       setAppIsReady(true);
  //     }
  //   }
  //   prepare();
  // }, []);

  const onLayoutRootView = useCallback(async () => {
    // 재렌더링이 되더라도 appIsReady(현재 true)값이 바뀌지 않는 이상, hideAsync() 함수를 계속 재사용 가능하다.
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // if (!appIsReady) {
  //   return null;
  // }

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </ThemeProvider>
  );
}
