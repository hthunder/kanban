import React, { useState } from "react";

interface AuthProviderPropsI {
  children: JSX.Element;
}

interface UserInfoI {
  name: string;
  email: string;
  id: string;
  role: string;
}

interface AuthStateI {
  token?: string;
  userInfo?: UserInfoI;
  isAuthenticated: boolean;
}

interface AuthContextI {
  authState: AuthStateI;
  setAuthInfo: (token: string, userInfo: UserInfoI) => void;
  deleteAuthInfo: () => void;
}

const AuthContext = React.createContext<AuthContextI | null>(null);
AuthContext.displayName = "Auth";

const AuthProvider = (props: AuthProviderPropsI) => {
  const { children } = props;
  const [authState, setAuthState] = useState<AuthStateI>({
    userInfo: { ...JSON.parse(localStorage.getItem("auth") || "{}") },
    token: localStorage.getItem("token") || undefined,
    isAuthenticated: Boolean(localStorage.getItem("isAuthenticated")) || false,
  });

  const setAuthInfo = (token: string, userInfo: UserInfoI) => {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("isAuthenticated", "true");

    setAuthState({
      token,
      userInfo,
      isAuthenticated: true,
    });
  };

  const deleteAuthInfo = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    localStorage.removeItem("isAuthenticated");

    setAuthState({ isAuthenticated: false });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthInfo, deleteAuthInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
