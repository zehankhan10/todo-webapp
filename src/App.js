import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom';
import { UserRegister } from './components/user-register';
import { UserLogin } from './components/user-login';
import { UserDashBoard } from './components/user-dashboard';
import { UserInvalid } from './components/user-invalid';
import { useCookies } from 'react-cookie';
import { useEffect } from 'react';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies('userid'); 
  
  useEffect(()=>{

  },[]);
  
  return (
    <div className="container-fluid">
      <div className='bg-img'>
        <BrowserRouter>
            <header className='text-center shadow p-3'>
                <h2><span className='bi bi-pen-fill'></span> To Do </h2>
                <p>Your Appointment Organiser</p>
                {
                  (cookies['userid'] == undefined)?
                  <div>
                    <Link to='/login' className='btn btn-warning me-2'>Log in <span className='bi bi-chevron-right'></span></Link>
                    <Link to='/register' className='btn btn-danger'>Sign Up <span className='bi bi-person-plus-fill'></span></Link>
                  </div> : 
                  <div> {cookies['userid']} </div>
                }
            </header>
            
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
