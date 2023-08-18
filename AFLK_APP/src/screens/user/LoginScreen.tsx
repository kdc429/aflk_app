import React, {useState} from 'react';
import {Image, StyleSheet, Text, View, Button, Pressable} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {CommonStyles} from "@assets/styles/CommonStyles";
import {CustomInput} from "@components/common/CustomInput";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import {Login} from "@components/user/Login";

/*
* Description : login
* Author :
* */
export const LoginScreen = () => {
  return (
      <Login />
  )
}