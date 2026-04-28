import React from 'react'
import MainNavbar from '../Components/MainNavbar'
import Footer from '../Components/Footer'

const MainLayout = ({children}) => {
  return (
    <>
      <header>
        <MainNavbar/>
      </header>
      <main>
        {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  )
}

export default MainLayout
