import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router-dom";
import './user-dashboard.css';


export function UserDashBoard(){

    const [cookies, setCookie, removeCookie] = useCookies('userid');
    const [appointments, setAppointments] = useState([{Appointment_Id:0, Title:'', Description:'', Date:''}]);
    const [EditTasks, setEditTasks] = useState([{Appointment_Id:0, Title:'', Description:'', Date:''}])

    let navigate = useNavigate();


    useEffect(()=>{
        axios.get(`http://127.0.0.1:8080/appointments/${cookies['userid']}`)
        .then(response =>{
            setAppointments(response.data);
        })
        .catch(function (error) {
            // handle error here
            console.log(error)
          });
    },[])

    function handleSignout(){
        removeCookie('userid');
        navigate('/login');
        window.location.reload();
    }

    function handleCloseClick(e){
        axios.delete(`http://127.0.0.1:8080/delete-task/${e.target.name}`)
        .then(()=>{
            alert("Task Deleted Successfully");
        });
        window.location.reload();
    }

    const formik=useFormik({
        initialValues:{
            Appointment_Id: 0,
            Title:"" ,
            Description:"",
            Date:"",
            UserId: cookies['userid']
        },
        onSubmit:(task)=>{
            axios.post(`http://127.0.0.1:8080/add-task`,task);
            console.log("Task Added Successfully");
            window.location.reload();
        }
    });
    
    function handleEditClick(){
        
    }
    
    return(
        <div className="dashboard ">

            <div className="shadow  p-5 rounded"> 
                <h2 className="mb-4" >Your Appointments <button onClick={handleSignout} className='btn btn-warning ms-3'>Signout</button> </h2>
                
                <div>
                    <button className="btn btn-primary bi bi-calendar-event mb-2" data-bs-target='#addTask' data-bs-toggle="modal"> Add Appointment</button>
                    <div className="modal" id="addTask"data-bs-backdrop="false">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content shadow"style={{marginTop:"90px"}}>
                                <div className="modal-header">
                                    <h2 >Add Appointment</h2>
                                    <button className="btn btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div className = "modal-body">
                                    <form className="shadow w-100 p-3" onSubmit={formik.handleSubmit} >
                                        <div className="mb-3">
                                            <label for="AppId" className="form-label">Appointment Id</label>
                                            <input type="text" name="AppId" onChange={formik.handleChange}  className="form-control" id="AppId"/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="Title" className="form-label">Title</label>
                                            <input type="text" name="Title" onChange={formik.handleChange} className="form-control" id="Title"/>
                                        </div>
                                        <div className="mb-3">
                                            <label for="Description" className="form-label">Description</label>
                                            <textarea id="Description" rows='4' onChange={formik.handleChange} className="form-control" cols='40'name="Description"></textarea>
                                        </div>
                                        <div className="mb-3 w-50">
                                            <label for="date" className="form-label">Date</label>
                                            <input type="date" className="form-control" onChange={formik.handleChange} name="Date" />
                                        </div>
                                        
                                        <button type="submit" className="btn btn-primary">Add Appointment</button>
                                    </form>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                {
                    appointments.map((appointment)=>(
                        <div key={appointment.Appointment_Id} className="alert alert-success alert-dismissible">
                            <button name={appointment.Appointment_Id} onClick={handleCloseClick} className="btn btn-close" data-bs-dismiss="alert"></button>
                            <strong>Title : </strong>{appointment.Title} <br/>
                            <strong>Description : </strong>{appointment.Description}<br/>
                            <strong>Date: </strong>{appointment.Date}<br/>
                            <button onClick={handleEditClick} className="btn btn-secondary  bi bi-pen mt-2"> Edit</button>
                        </div>    
                    ))
                }
            </div>
        </div>
        
    )
}