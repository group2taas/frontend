import Cookies from 'js-cookie';
import axiosInstance from '@/axios/axios-instance';
import { UserProfile } from '@/types/mongo-documents';
import { AuthResponse } from '@/types/auth-response';

const TOKEN_KEY: string = 'token';
const TOKEN_ATTR: Cookies.CookieAttributes = { secure: false };

const storeToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, TOKEN_ATTR);
};

const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

const deleteToken = () => {
  Cookies.remove(TOKEN_KEY, TOKEN_ATTR);
}

const exchangeFirebaseToken = async (idToken: string) => {
  const response = await axiosInstance.post<AuthResponse>('/login/', {
    idToken
  });
  return response.data;
};

const createUserWithToken = async (idToken: string, userData: Partial<UserProfile>) => {
  const response = await axiosInstance.post<AuthResponse>('/signup/', {
    idToken,
    user: userData
  });
  return response.data;
};

export { storeToken, getToken, deleteToken, createUserWithToken, exchangeFirebaseToken};
