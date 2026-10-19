
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Products from './pages/Products';
import ProtectedRoute from './pages/ProtectedRoute';
import Try from './pages/Try';
import Cart1 from './Cart1';
import SignUp from './pages/SignUp';
import LogOut from './pages/LogOut';


function App() {

  return (
    <>
    <Try/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<ProtectedRoute><Cart1/></ProtectedRoute>}/>
      <Route path="/cont" element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/prod" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
      <Route path="/try" element={<Try/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/logout" element={<LogOut/>}/>
      

    </Routes>
    </>
  );
};

export default App
