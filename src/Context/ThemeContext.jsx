import React, { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {

  const [mode, setMode] = useState(() => {
    return localStorage.getItem("Theme") || "light";
  });

  const toggleMode = ()=>{
    setMode ( prev => prev === 'light' ? 'dark' : 'light')
  }

  useEffect(()=>{
    document.documentElement.setAttribute('class',mode)
    localStorage.setItem('Theme', mode)
  },[mode])

  return (
    <ThemeContext.Provider value={{mode, toggleMode}}>
        {children}
    </ThemeContext.Provider>
  )
};
