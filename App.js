import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // 데이터를 가져오는 구간
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // fetch data...

        // 테스트를 위한 타이머 설정
        await new Promise((resolve) => setTimeout(resolve, 3000));
      } catch (e) {
        console.error(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView}>
      <Text>We are done loading!</Text>
    </View>
  );
}
