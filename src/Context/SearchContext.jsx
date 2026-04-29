import React, { createContext, useEffect, useState } from 'react'

export const SearchContext = createContext('')

export const SearchProvider = ({children}) => {

    const [searchText, setSearchText] = useState('')
    const [submited, setSubmited] = useState(false)
    useEffect(()=>{console.log(submited)},[submited])
    return(
        <SearchContext.Provider value={{searchText, setSearchText,submited, setSubmited}}>
            {children}
        </SearchContext.Provider>
    )

}