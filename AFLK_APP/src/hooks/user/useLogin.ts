import { useMutation } from "react-query";
import { login } from "@/api/user/user";
import { useUserState } from "@/contexts/user/UserContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackNavigationProp } from "@screens/RootStack";
import {userStorage} from "@/storages/userStorage";
import {useInform} from "@/hooks/common/useInform";

export const useLogin = () => {
  const [, setUser] = useUserState();
  const navigation = useNavigation<RootStackNavigationProp>();
  const inform = useInform();
  const mutation = useMutation(login, {
    onSuccess: (data) => {
      if(data.result.token){
        // 로그인 성공
        const userData = {
          token: data.result.token
        }
        setUser(userData);
        userStorage.set(data);

        navigation.navigate('Main');
      }else{
        // 로그인 실패
        const message = data.message ?? '로그인 실패';
        inform({
          title: '알림',
          message
        })
      }
    },
    onError: (err) => {
      console.log('?')
      console.log(err);
    //   TODO: 에러처리
    }
  })

  return mutation;
}
