import { useEffect, useReducer } from "react";
import { AuthContext } from "./auth/AuthContext";
import { AppRouter } from "./routers/AppRouter";
import { authReducer } from "./auth/authReducer";
import 'antd/dist/antd.css';
import tokenAuth from "./config/token";

const init = () => {
  if (localStorage.getItem('token')) {
    tokenAuth();
  }
  return JSON.parse(localStorage.getItem("user")) || { logged: false };
};

export const App = () => {
  const [user, dispatch] = useReducer(authReducer, {}, init);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
    </AuthContext.Provider>
  );
};
