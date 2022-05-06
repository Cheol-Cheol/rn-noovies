import * as SplashScreen from "expo-splash-screen";
import React, { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { Asset } from "expo-asset";

import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    // 스플래쉬 스크린 중 데이터를 가져오는 구간
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        // fetch data...
        await Font.loadAsync(Ionicons.font);
        await Asset.loadAsync(require("./image01.jpeg"));
      } catch (e) {
        console.error(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    // 재렌더링이 되더라도 appIsReady(현재 true)값이 바뀌지 않는 이상, hideAsync() 함수를 계속 재사용 가능하다.
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
