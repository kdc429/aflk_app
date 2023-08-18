import AsyncStorage from "@react-native-async-storage/async-storage";
import {LoginResult} from "@/api/user/types";

const key = 'user';

export const userStorage = {
  async get() {
    const rawData = await AsyncStorage.getItem(key);
    if(!rawData) return null;

    try {
      const data: LoginResult = JSON.parse(rawData);
      return data;
    }catch (e) {
      return null;
    }
  },
  set(loginResult: LoginResult) {
    return AsyncStorage.setItem(key, JSON.stringify(loginResult));
  },
  clear() {
    return AsyncStorage.removeItem(key);
  }
};