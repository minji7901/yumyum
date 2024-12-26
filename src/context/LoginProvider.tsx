import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

type LoginContextType = {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
};

const LoginContext = createContext<LoginContextType>({
  isLogin: false,
  login: () => {},
  logout: () => {}
});

export const useLoginContext = () => useContext(LoginContext);

const LoginProvider = ({ children }: PropsWithChildren) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const login = useCallback(() => setIsLogin(true), []);
  const logout = useCallback(() => setIsLogin(false), []);

  return <LoginContext.Provider value={{ isLogin, login, logout }}>{children}</LoginContext.Provider>;
};

export default LoginProvider;
