import { useFormik } from "formik";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";


export function UserLogin(){
    const [cookies, setCookie, removeCookie] = useCookies('userid');
    useEffect(() =>{
       
      },[]);
    let navigate = useNavigate();
    const[users, setUsers] = useState([]);
    useEffect(() =>{
        axios.get('http://127.0.0.1:8080/users')
        .then(response =>{
            setUsers(response.data);
        });
    },[]);

    const formik = useFormik({
        initialValues:{
            UserId: '',
            Password: ''
        },
        onSubmit: (formdata) =>{
            var userdetails = users.find(user => user.UserId === formdata.UserId);
            if(userdetails.Password === formdata.Password){
                const expirationTime = new Date();
                expirationTime.setDate(expirationTime.getDate() + 1);
                setCookie('userid', formdata.UserId, {expires: expirationTime});
                // setCookie('userid', formdata.UserId,{expires});
                navigate('/dashboard');
                window.location.reload(); // refresh page if no user id is found in cookies
            } else{
                navigate('/invalid');
            }
        } 
    });

    return(
        <div className="w-100 mt-auto d-flex justify-content-center align-items-center flex-column"> 
        <h2 className="mt-3 shadow p-2">Log In</h2>
        <form className="shadow w-25 p-3" onSubmit={formik.handleSubmit} >
            <div className="mb-3">
                <label for="UserId" className="form-label">UserId</label>
                <input type="text" onChange={formik.handleChange} name="UserId" className="form-control" id="UserId"/>
            </div>
            <div className="mb-3">
                <label for="Password" className="form-label">Password</label>
                <input type="password" name="Password" onChange={formik.handleChange} className="form-control" id="Password"/>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            </form>
    </div>
    )
}