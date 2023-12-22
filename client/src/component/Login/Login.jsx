import React, { useContext, useState } from 'react'
import "./Login.scss"
import { Link,useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserContext} from "../../authcontext"

const Login = () => {
const{loginUser}=useContext(UserContext)
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate();
  const handleLogin=async(e)=>
  {
    e.preventDefault();
    try{
      const data={
        email,password
      }
      const response= await axios.post('http://localhost:4000/login', data)
      if(response.status===200)
      {
        loginUser(response.data.token)
        navigate('/');
      }
    }
    catch(e)
{
  alert("wrong credentialss")
}
   
  }
  return (
    <div className='login'>
        <h1>Login</h1>
        <div className="loginWrapper">
            <form onSubmit={handleLogin}>
                <input type="text" placeholder='Enter your Email' onChange={(e)=>setemail(e.target.value)} required/>
                <br />
                <br />
                <input type="password"  placeholder='Create Your Password'onChange={(e)=>setpassword(e.target.value)} required/>
                <br />
                <br />
                <input type="submit" />
            </form>
            <p>Don't have an Account? <Link to="/register">Register Now</Link> </p>
        </div>
    </div>
  )
}

export default Login