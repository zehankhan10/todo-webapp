import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { UserRegister } from './components/user-register';
import { UserLogin } from './components/user-login';
import { UserDashBoard } from './components/user-dashboard';
import { UserInvalid } from './components/user-invalid';

import { Header } from './components/header';

function App() {
  
  
  return (
    <div className="container-fluid">
      <div className='bg-img'>
        <BrowserRouter>
            <Header />
            <Routes>
              <Route path='login' element={<UserLogin />} />
              <Route path='register' element={<UserRegister />} />
              <Route path='dashboard' element={<UserDashBoard />} />
              <Route path='invalid' element={<UserInvalid />} />
            </Routes>
      
          </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
