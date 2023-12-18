
import './App.css';
import Login from './login/Login';
import { Route, Routes } from 'react-router-dom';
import Register from './register/Register';
import { useState } from 'react';
import Home from './Home';

function App() {
  const [isLogin,setIsLogin]=useState(false)
  return (
    <>
     <Routes>
      <Route path='/register' element={<Register isLogin={isLogin} setIsLogin={setIsLogin} />} />
      <Route path="/" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}/>
      <Route path='/home' element={<Home isLogin={isLogin} />} />
     </Routes>
    </>
    
  );
}

export default App;
