import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {ActivityIndicator, Button, Image, Pressable, StyleSheet, Text, View} from "react-native";
import React, {useState} from "react";
import {CommonStyles} from "@assets/styles/CommonStyles";
import {CustomInput} from "@components/common/CustomInput";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import {useLogin} from "@/hooks/user/useLogin";
import {useUserState} from "@/contexts/user/UserContext";
import {useNavigation} from "@react-navigation/native";
import {RootStackNavigationProp} from "@screens/RootStack";
import {CustomButton} from "@components/common/CustomButton";

// @ts-ignore
export const Login = () => {
  const [user] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();

  if(user?.token) {
    navigation.navigate('Main');
    return (<View/>);
  }

  const Logo = () => (<Image style={styles.logo} source={require('@assets/img/logo_app.png')} />);
  const [isCheck, setIsCheck] = useState(false);
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');

  const {mutate: login, isLoading: loginLoading} = useLogin();
  const isLoading = loginLoading;

  const onPress = async () => {
    if(isLoading) return;

    login({
      domainCd: 1, userId: userId, userPw: userPwd
    })
  }

  return (
    <View style={[CommonStyles.default_app, styles.login_screen]}>
      <View style={[CommonStyles.inner_wrap, styles.login_wrap, CommonStyles.box_shadow4]}>
        <View style={[CommonStyles.jc_center, {width: '100%', alignItems: 'center'}]}>
          <Logo/>
        </View>
        <View style={[CommonStyles.mgh20]}>
          <CustomInput placeholder='  아이디' placeholderTextColor='#acb8c8' value={userId} onChangeText={setUserId}/>
          <CustomInput placeholder='  비밀번호' placeholderTextColor='#acb8c8' secureTextEntry={true} value={userPwd} onChangeText={setUserPwd}/>
        </View>
        <View>
          <BouncyCheckbox
            size={20}
            fillColor='#f18a1c'
            text='아이디 저장'
            onPress={(newValue) => setIsCheck(newValue)}
            innerIconStyle={{borderRadius: 5}}
            iconStyle={{borderRadius: 5}}
            textStyle={{textDecorationLine: 'none', fontSize: 13}}
            style={[CommonStyles.mgh20]}
          />
        </View>
        <View style={[CommonStyles.mg20, CommonStyles.jc_center, {height: 90}]}>
          {
            isLoading ? (
              <ActivityIndicator size={'small'} color={'#000'} />
            ): (
              <>
                <CustomButton title='로그인' onPress={onPress} />
                <CustomButton title='회원가입' onPress={() => {}} styles={CommonStyles.mgt10}/>
              </>
            )
          }

        </View>
        <View style={[CommonStyles.jc_center, CommonStyles.mgh20]}>
          <Pressable>
            <Text style={[CommonStyles.default_color, CommonStyles.mgb20]}>이용약관</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {width: 200, height: 150, marginTop: 30},
  login_screen: {justifyContent: 'center', alignItems: 'center', height: '100%'},
  login_wrap: {width: '85%', height: 'auto', minHeight: 0}
})