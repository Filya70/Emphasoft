import { createContext } from 'react';

function empty() {}

const AuthContext = createContext({
  token: null,
  login: empty,
  logout: empty,
  isAuth: false,
  data: null,
  loading: true,
});

export default AuthContext;
