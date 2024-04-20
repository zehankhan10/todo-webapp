import { useCookies } from 'react-cookie';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header(){

const [cookies, setCookie, removeCookie] = useCookies('userid'); 
  
  useEffect(()=>{

  },[]);
    return(
        <>
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
        </>
    )
}