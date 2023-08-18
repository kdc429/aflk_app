export interface User {
  token: string;
}

export interface Article {
  id: number;
  title: string;
  body: string;
  user: User;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: number;
  message: string;
  user: User;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResult {
  jwt: string;
  user: User;
}

export interface LoginParams {
  domainCd: number
  userId: string;
  userPw: string;
}

export interface LoginResult {
  message: string;
  result: Token;
}

interface Token {
  token: string;
}