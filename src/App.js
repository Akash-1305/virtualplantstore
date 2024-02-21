import Admin from './admin';
import User from './user';
import Login from './Login';
import Home from './Home';
import Manageproducts from './manageproducts';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/user' element={<User />} />
      </Routes>
      <Routes>
        <Route path='/manageproducts' element={<Manageproducts />} />
      </Routes>
    </BrowserRouter>

  );
}

