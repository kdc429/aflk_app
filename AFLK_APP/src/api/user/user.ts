import client from "@/api/userClient";
import {LoginParams, LoginResult} from './types'

export const login = async (params: LoginParams) => {
  const response = await client.post<LoginResult>('/login', params);
  return response.data;
}