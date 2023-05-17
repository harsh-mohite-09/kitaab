import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(localStorage.getItem("user"));

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
