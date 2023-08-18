import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ParamListBase } from "@react-navigation/native";
import {RootStackParamList} from "./types";
import { RegisterScreen } from "./user/RegisterScreen";
import { LoginScreen } from "./user/LoginScreen";
import {RootScreen} from "@screens/RootScreen";

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootStack = () => {
  return(
    <Stack.Navigator
      screenOptions={{
       contentStyle: {},
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} options={{ title: '로그인' }} />
      <Stack.Screen name='Register' component={RegisterScreen} options={{ title: '회원가입' }} />
      <Stack.Screen name='Main' component={RootScreen} options={{ title: '메인', headerShown: false }} />
    </Stack.Navigator>
  )
}