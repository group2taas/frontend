import Cookies from 'js-cookie';

const TOKEN_KEY: string = 'token';
const TOKEN_ATTR: Cookies.CookieAttributes = { secure: true };

const storeToken = (token: string) => {
  Cookies.set(TOKEN_KEY, token, TOKEN_ATTR);
};

const getToken = () => {
  return Cookies.get(TOKEN_KEY);
};

const deleteToken = () => {
  Cookies.remove(TOKEN_KEY, TOKEN_ATTR);
}

export { storeToken, getToken, deleteToken };
