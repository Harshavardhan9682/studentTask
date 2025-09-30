import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axiosInstance from "../axiosInstance/axiosInstance";
import { useNavigate } from "react-router-dom";

import { sessionStorageGetItem,sessionStorageSetItem } from "../axiosInstance/sessionStorage";

type User = { email: string } | null;

type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string, role: string) => Promise<void>;
  logout: () => void;
  fetchStudentData: () => Promise<string|number>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [token, setToken] = useState<string | null>(sessionStorageGetItem("token"));
  const [refreshToken, setRefreshToken] = useState<string | null>(
    sessionStorageGetItem("refreshToken")
  );
 
  const [tokenExpiry, setTokenExpiry] = useState<number | null>(sessionStorageGetItem("tokenExpiry")?Number(sessionStorageGetItem("tokenExpiry") ):null)

  const navigate = useNavigate();
console.log(tokenExpiry)
  // LOGIN
  const login = async (email: string, password: string, role: string) => {
   try{
     const res = await axiosInstance.post("/login", { email, password, role });
     console.log(res.data)
    const { token, refreshToken, role: userRole } = res.data;

    const payload = JSON.parse(atob(token.split(".")[1]));
    const expiry = payload.exp * 1000;
    
        
    sessionStorageSetItem("token", token);
    sessionStorageSetItem("refreshToken", refreshToken);
    sessionStorageSetItem("role", userRole);
   sessionStorageSetItem("tokenExpiry", expiry.toString());
    setUser({ email });
    setToken(token);
    setRefreshToken(refreshToken);
  
   }catch(err){
    console.error(";login",err)
    throw err
   }
  };
  
  console.log(tokenExpiry,"60")

  // LOGOUT
  const logout = () => {
    setUser(null);
    setToken(null);
    setTokenExpiry(null);
    sessionStorage.clear();
    sessionStorage.clear();
    navigate("/sessionExpired");
  };


  const refreshTokenIfNeeded = async () => {
    if (!refreshToken) return;
    try {
      const res = await axiosInstance.post("/refresh", { refreshToken });
      const newToken = res.data.token;

      const payload = JSON.parse(atob(newToken.split(".")[1]));
      const newExpiry = payload.exp * 1000;

      sessionStorageSetItem("token", newToken);
      sessionStorageSetItem("tokenExpiry", newExpiry.toString());
     
      setToken(newToken);
      setTokenExpiry(Number(sessionStorageGetItem("tokenExpiry")));

      console.log("Token refreshed successfully");
    } catch (err) {
      console.error("Refresh token failed:", err);
      logout();
    }
  };


  useEffect(() => {
    const handleActivity = () => {
      sessionStorageSetItem("isActive", "true");
      
    };
    ["mousemove", "keydown", "scroll"].forEach((e) =>
      window.addEventListener(e, handleActivity)
    );
    return () =>
      ["mousemove", "keydown", "scroll"].forEach((e) =>
        window.removeEventListener(e, handleActivity)
      );
  }, []);

  useEffect(() => {
    console.log("clear useEffect")
  
    const interval = setInterval(() => {

      console.log(tokenExpiry,"this Expire")

      if (!tokenExpiry) return;

      const now = Date.now();
      const userActive = sessionStorageGetItem("isActive") === "true";

      if (now >= tokenExpiry) {
        console.log("Token expired. Logging out.");
        logout();
        return;
      }

      if (now > tokenExpiry - 60 * 1000 && userActive) {
        console.log("Token expiring soon. Refreshing...");
        refreshTokenIfNeeded();
        sessionStorageSetItem("isActive", "false");
        
      }
    }, 10 * 1000);

    return () => clearInterval(interval);
  }, [tokenExpiry, refreshToken]);

  
  const fetchStudentData = async () => {
    if (!token) throw new Error("Not authenticated");
    const res = await axiosInstance.get("/student", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, fetchStudentData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
