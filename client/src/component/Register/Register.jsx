import React,{useState} from 'react'
import "./Register.scss"
import { Link,useNavigate  } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [UserName, setUserName] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const navigate=useNavigate();

  const handleRegister= async(e)=>
  {
    e.preventDefault();
    const data={
      username:UserName,
      email:email,
      password:password
    }

    const response= await axios.post('http://localhost:4000/register', data);
    if(response.status===200)
    {
      navigate("/login")
    }
    
  }
  return (
    <div className='register'>
        <h1>Register</h1>
        <div className="registerWrapper">
            <form onSubmit={handleRegister}>
                <input type="text" name="" id="" placeholder='Enter Your Name' onChange={(e)=>setUserName(e.target.value)} required/>
                <br />
                <br />
                <input type="text" placeholder='Enter your Email' onChange={(e)=>setemail(e.target.value)} required/>
                <br />
                <br />
                <input type="password"  placeholder='Create Your Password' onChange={(e)=>setpassword(e.target.value)} required/>
                <br />
                <br />
                <input type="submit" className='button'/>
            </form>
            <p>Already have an Account? <Link to="/login">Login</Link></p>
        </div>

    </div>
  )
}

export default Register