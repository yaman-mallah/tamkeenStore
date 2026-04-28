import React, { createContext, useEffect, useState } from "react";

export const LangContext = createContext();

export const LangProvider = ({ children }) => {

  const [lang, setLang] = useState("ltr");

  const toggleLang = ()=>{
    setLang ( prev => prev === 'rtl' ? 'ltr' : 'rtl')
  }

  useEffect(()=>{
    document.documentElement.setAttribute('dir',lang)
  },[lang])

  return (
    <LangContext.Provider value={{lang, toggleLang}}>
        {children}
    </LangContext.Provider>
  )
};
