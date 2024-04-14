import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.min.css';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Home from './Home Page/Home';
import Header from './Home Page/Header';
import About from './Home Page/About';
import Login from './Home Page/Login';
import Registration from './Home Page/Register';
import Admin from './Admin/admin';
import Adminnav from './Admin/Adminnav';
import Manageproducts from './Admin/manageproducts';
import Manageusers from './Admin/Manageusers';
import Manageorders from './Admin/manageorders'
import User from './User/user';
import Usernav from './User/Usernav';
import Myorders from './User/Myorders';
import Myprofile from './User/Myprofile';
import Cart from './User/Cart';
export const baseurl = "http://localhost:8081"


export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer/>
      <Routes>
        <Route path='' element={<Header />}>
          <Route path='' element={<Home />} />
          <Route path='About' element={<About />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Registration />} />
        </Route>
      </Routes>
      <Routes>
        <Route path='Admin' element={<Adminnav />}>
          <Route index element={<Admin />} />
          <Route path='Manageproducts' element={<Manageproducts />} />
          <Route path='Manageusers' element={<Manageusers />} />
          <Route path='Manageorders' element={<Manageorders />} />
        </Route>
        <Route path='User' element={<Usernav/>}>
        <Route index element={<User />} />
        <Route path='Cart' element={<Cart />}/>
        <Route path='MyOrders' element={<Myorders />}/>
        <Route path='MyProfile' element={<Myprofile />}/>
        </Route>
      </Routes>
    </BrowserRouter>

  );
}

