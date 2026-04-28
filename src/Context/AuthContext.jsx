import React, { createContext, useEffect, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState()

    useEffect(()=>{
        const userData = localStorage.getItem('userData')
        if(userData)
            setUserInfo(JSON.parse(userData))
    },[])
    

    return(
        <AuthContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </AuthContext.Provider>
    )

}
