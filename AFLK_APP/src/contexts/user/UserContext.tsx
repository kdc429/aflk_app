import React, {createContext, useContext, useState} from "react";
import {User} from "@/api/user/types";

type UserContextState = [User | null, (user: User | null) => void];

const UserContext = createContext<UserContextState | null>(null);
export const UserContextProvider = ({children}: {children: React.ReactNode}) => {
  const userState = useState<User | null>(null);
  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};

export const useUserState = () => {
  const userState = useContext(UserContext);
  if(!userState) {
    throw new Error('UserContext is not used');
  }
  return userState;
}