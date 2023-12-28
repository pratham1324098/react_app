import React, { useState } from 'react'
import '../styles/Login.css'
import axios from "axios";
import { toast } from "react-toastify";

import { Link,useNavigate } from 'react-router-dom'
function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    //hooks
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/auth/login", {
        email,
        password,
      });
      if (data.success) {
        
        // console.log(data)
        console.log(data.user._id)
        localStorage.setItem("userId",data.user._id)
        localStorage.setItem("token", data.token);
        localStorage.setItem("username",data.user.name);
        toast.success("Login Successfully ");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Invalid Credintial please try again!");
      console.log(error);
    }
  };
    return (
    <div className='her'>
        <form className="form-container"onSubmit={handleSubmit}>
        <h1 className='log' >Login Page</h1>
  <div className="form-group">
    <label htmlFor="exampleInputEmail1">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"
            value={email}
              onChange={(e) => setEmail(e.target.value)}
              name="email" />
  </div>
  <div className="form-group">
    <label htmlFor="exampleInputPassword1">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    name="password" />
  </div>
  
  <button className="but">
    Submit
  </button >

  New User <Link to="/register">Register Here!</Link>
  </form>
</div>
  )
}

export default Login