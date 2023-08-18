/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { NavigationContainer } from "@react-navigation/native";
import { RootStack } from "./screens/RootStack";
import {QueryClient, QueryClientProvider} from "react-query";
import {UserContextProvider} from "@/contexts/user/UserContext";
import {RequestPermission} from '@/conf/RequestPermission'
import messaging from "@react-native-firebase/messaging";
import {onDisplayNotification} from "@/util/PushNotification";

const queryClient = new QueryClient();

function App(): JSX.Element {

  useEffect(() => {
    // RequestPermission();

    // return messaging().onMessage(async remoteMessage => {
    //   const title = remoteMessage?.notification?.title;
    //   const body = remoteMessage?.notification?.body;
    //
    //   await onDisplayNotification({title, body});
    // });
  }, [])

  return (
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </QueryClientProvider>
    </UserContextProvider>
  );
}

export default App;
