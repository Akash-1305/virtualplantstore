import Admin from './admin';
import User from './user';
import Login from './Login';
import Home from './Home';
import Header from './Header';
import Manageproducts from './manageproducts';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '/node_modules/react-toastify/dist/ReactToastify.css';
import './index.css';
import Adminnav from './Adminnav';
export const baseurl = "http://localhost:8081"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Header />}>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        </Route>
      </Routes>
      <Routes>
      <Route path='/' element={<Adminnav/>}>
        <Route path='/Admin' element={<Admin />} />
        <Route path='/User' element={<User />} />
        <Route path='/Manageproducts' element={<Manageproducts />} />
      </Route>
      </Routes>
    </BrowserRouter>

  );
}

