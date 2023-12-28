import React ,{useState} from 'react'
import { toast } from "react-toastify";
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios';
// import { useDispatch, useSelector } from "react-redux";
// import { hideLoading, showLoading } from "../redux/features/alertSlice";

// import { useDispatch } from 'react-redux';
import "../styles/Register.css"
function Register() {
    const [name,setName]=useState("")
    const [email,setEmail]=useState("")
    const [password,setPassword]=useState("")
    const [address,setAddress]=useState("")
    const [phonenumber,setPhoneNumber]=useState("")
    //redux state

  //hooks
//   const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            console.log("Inside try block");
            if (!name || !email || !password||!address||!phonenumber) {
              return toast.error("Please Provide All Fields");
            }
            // dispatch(showLoading());
            const { data } = await axios.post("/api/v1/auth/register", {
              name,
              email,
              password,
              address,
              phoneNumber:phonenumber,
            });
            console.log(data)
            // dispatch(hideLoading());
            if (data.success) {
                alert("Registered Successfully");
                console.log("Navigating to /login");
                navigate("/login");
            }
          } catch (error) {
            // dispatch(hideLoading());
            alert("Invalid Form in register Details Please Try Agian!");
            console.log(error);
          }
      }
    
  return (
    
    <>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullName">Name</label>
          <input type="text" className="form-control input-field" id="fullName" value={name} onChange={(e)=> setName(e.target.value)} placeholder="Enter your Name" />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control input-field" id="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder="Enter email" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control input-field" id="password"  value={password} onChange={(e)=> setPassword(e.target.value)} placeholder="Enter password" />
        </div> 
        <div className="form-group">
          <label htmlFor="password">Address</label>
          <input type="text" className="form-control input-field" id="address"  value={address} onChange={(e)=> setAddress(e.target.value)} placeholder="Enter Address" />
        </div>
        <div className="form-group">
          <label htmlFor="phone number">Phone Number</label>
          <input type="text" className="form-control input-field" id="phonenumber"  value={phonenumber} onChange={(e)=> setPhoneNumber(e.target.value)} placeholder="Phone Number" />
        </div>
        <button className="button">Register</button>
        Already Register <Link to="/login">Login</Link>
      </form>
    </>

    
  )
}

export default Register