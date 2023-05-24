import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  // Since our mock backend wipes any cart and wishlist data stored in a session,
  // it is essential to update the same in the localStorage and in the current dataContext
  // to maintain the sync between dataContext and actual user data.
  // For this, useEffect is used just once on every hard refresh.

  useEffect(() => {
    setUser((prev) => ({ ...prev, cart: [], wishlist: [] }));
    if (user) {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, cart: [], wishlist: [] })
      );
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);

export default AuthProvider;
