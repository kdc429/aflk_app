import {useEffect} from "react";
import {useUserState} from "@/contexts/user/UserContext";
import {userStorage} from "@/storages/userStorage";

export const useAuthLoadEffect = () => {
  const [ ,setUser] = useUserState();

  useEffect(() => {
    const fn = async () => {
      const auth = await userStorage.get();

      if(!auth) return;

      const result1 = auth.data[0][0];
      const result2 = auth.data[1][0];
      const userData = {
        ADMIN_YN: result1.ADMIN_YN,
        D_NO: result1.D_NO,
        D_NAME: result1.D_NAME,
        D_UID: result1.D_UID,
        MERCHANT_CODE: result1.MERCHANT_CODE,
        GUBUN: result1.GUBUN,
        PAY_TYPE: result1.PAY_TYPE,
        USER_LEVEL: result1.USER_LEVEL,
        MID: result2.MID,
        COMPANY_NM: result2.COMPANY_NM
      }

      setUser(userData);
    }
    fn();
  }, [setUser])
}