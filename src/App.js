import Admin from './admin';
import User from './user';
import Login from './Login';
import Home from './Home';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';


export default function App() {
  return (
    
      <BrowserRouter>
        <Link to={'/'}>Home</Link>
        <Link to={'/Login'}>Login</Link>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/Login' element={<Login />} />
          <Route path='/admin' element={<Admin />}/>
          <Route path='/user' element={<User />}/>
        </Routes>
      </BrowserRouter>
  
  );
}

