import { Route, Routes } from 'react-router'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Otp from './User/Otp';
import Home from './Pages/Home';
import MainLayout from './Layouts/MainLayout';
import Profile from './User/Profile';
import Login from './User/Login';
import Register from './User/Register';
import SecondaryLayout from './Layouts/SecondaryLayout';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Products from './Store/Products';
import Details from './Store/Details';

function App() {

  return (
    <>
    <Routes>
        <Route path='/user/login' element={<Login/>}></Route>
        <Route path='/user/register' element={<Register/>}></Route>
        <Route path='/user/verify' element={<Otp/>}></Route>
        <Route path='/' element={<MainLayout><Home/></MainLayout>}/>
        <Route path='/about-us' element={<MainLayout><AboutUs/></MainLayout>}/>
        <Route path='/products' element={<MainLayout><Products/></MainLayout>}/>
        <Route path='/products/:id' element={<SecondaryLayout><Details/></SecondaryLayout>}/>
        <Route path='/user/profile/:activeTab?' element={<SecondaryLayout><Profile/></SecondaryLayout>}/>
        <Route path='/contact-us' element={<SecondaryLayout><ContactUs/></SecondaryLayout>}/>
    </Routes>
    </>
  )
}

export default App
