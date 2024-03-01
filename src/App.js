import Admin from './Admin/admin';
import User from './User/user';
import Login from './Home Page/Login';
import Home from './Home Page/Home';
import Header from './Home Page/Header';
import Manageproducts from './Admin/manageproducts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import Adminnav from './Admin/Adminnav';
import Registration from './Home Page/Register';
import Manageusers from './Admin/Manageusers';
export const baseurl = "http://localhost:8081"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='' element={<Header />}>
          <Route path='' element={<Home />} />
          <Route path='Login' element={<Login />} />
          <Route path='Register' element={<Registration />} />
        </Route>
      </Routes>
      <Routes>
        <Route path='Admin' element={<Adminnav />}>
          <Route index element={<Admin />} />
          <Route path='Manageproducts' element={<Manageproducts />} />
          <Route path='Manageusers' element={<Manageusers />} />
        </Route>
        <Route path='/User' element={<User />} />
      </Routes>
    </BrowserRouter>

  );
}

