import React from 'react';
import {StyleSheet, View} from 'react-native';
import {MainTab} from "@screens/MainTab";

/*
* Description : Root
* Author :
* */
export const RootScreen = () => {
  return (
    // <DashBoard />
    <MainTab />
  )
}

const styles = StyleSheet.create({
  default_app: {backgroundColor: '#f68989'}
})