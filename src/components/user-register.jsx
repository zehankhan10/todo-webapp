import axios from "axios";
import { Formik, useFormik } from "formik";
import { Navigate, useNavigate } from "react-router-dom";

export function UserRegister(){
   let navigate = useNavigate();
    const formik = useFormik({
        initialValues:{
            UserId: '',
            UserName: '',
            Password: '',
            Mobile: '',
            Email: ''
    },
    onSubmit:(user)=>{
        axios.post('http://127.0.0.1:8080/register-user',user);
        alert('Registerd  Successfully');
        navigate('/login');
    }
});
    return(
        <div className="w-100 mt-auto d-flex justify-content-center align-items-center flex-column"> 
            <h2 className="mt-3 shadow p-2 ">Register</h2>
            <form className="shadow w-25 p-3" onSubmit={formik.handleSubmit} >
                <div className="mb-3">
                    <label for="UserId" className="form-label">UserId</label>
                    <input type="text" name="UserId" onChange={formik.handleChange} className="form-control" id="UserId"/>
                </div>
                <div class="mb-3">
                    <label for="UserName" className="form-label">UserName</label>
                    <input type="text" name="UserName" onChange={formik.handleChange} className="form-control" id="UserName"/>
                </div>
                <div class="mb-3">
                    <label for="Password" className="form-label">Password</label>
                    <input type="password" onChange={formik.handleChange} name="Password" className="form-control" id="Password"/>
                </div>
                <div class="mb-3">
                    <label for="Mobile" className="form-label">Mobile</label>
                    <input type="tel" onChange={formik.handleChange} name="Mobile" className="form-control" id="Mobile"/>
                </div>
                <div class="mb-3">
                    <label for="Email" className="form-label">Email</label>
                    <input type="email" onChange={formik.handleChange} name="Email" className="form-control" id="Email"/>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
                </form>
        </div>
    )
}