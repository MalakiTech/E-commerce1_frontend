
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Products from './pages/Products';
import ProtectedRoute from './pages/ProtectedRoute';
import Try from './pages/Try';


function App() {

  return (
    <>
    
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
      <Route path="/cont" element={<ProtectedRoute><Contact/></ProtectedRoute>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/prod" element={<ProtectedRoute><Products/></ProtectedRoute>}/>
      <Route path="/try" element={<Try/>}/>

    </Routes>
    </>
  );
};

export default App
