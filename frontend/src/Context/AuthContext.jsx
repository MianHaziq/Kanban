import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthProvider(props) {
 // const [isLoggedIn, setIsLoggedIn] = useState(false);
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

 

  const value = {
    token,
    login,

  };

  return <AuthContext.Provider value={value} {...props} />;
}

export { AuthContext, AuthProvider };