import React, { useContext, useState, useEffect } from "react";
import authService from "../service/authService";
import jwtDecode from "jwt-decode";
//import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  // const history = useHistory();

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    try {
      if (access_token !== null) {
        const data = jwtDecode(access_token);
        setCurrentUser(data);
        // history.goBack();
      }
    } catch (err) {
      console.log("Invalid token! Error: ", err);
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    setLoading(false);
  }, [currentUser]);

  async function login(email, password) {
    setLoading(true);
    const response = await authService.login(email, password);
    for (const data in response.data) {
        localStorage.setItem(data, response.data[data]);
    }
    setCurrentUser(jwtDecode(response.data["access_token"]));
    return response.data;
  }
  async function register(email, password, firstName, lastName, username) {
    setLoading(true);
    const response = await authService.register(email, password, firstName, lastName, username);
    return response.status;
  }
  async function logout() {
    localStorage.clear();
    setCurrentUser(null);
  }

  const value = {
    register,
    login,
    logout,
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
