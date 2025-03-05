import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
  const [token, setToken] = useState(null);

  useEffect(()=>{

    const jwtToken=localStorage.getItem('token');
    if(jwtToken){
      setToken(jwtToken);
    }

  },[]);

  const login = (jwtToken) => {
    localStorage.setItem('token',jwtToken);
    setToken(jwtToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };


  const value = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };