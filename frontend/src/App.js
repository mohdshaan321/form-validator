
import { Navigate, Route, Routes } from 'react-router-dom';

import './App.css';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';

function App() {
  return (
    <div className="App">
  <Routes>
    <Route path='/' element={<Navigate to = "/login"/>}/>
    <Route path='/Login' element={<Login/>}/>
    <Route path='/Signup' element={<Signup/>}/>
    <Route path='/Home' element={<Home/>}/>
  </Routes>
    </div>
  );
}

export default App;
