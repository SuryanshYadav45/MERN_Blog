import React, { useContext } from 'react'
import "./Navbar.scss"
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from "../../authcontext"
const Navbar = () => {
    const navigate= useNavigate();
    const { user,logoutUser } = useContext(UserContext);
    return (
        <div className='navbar'>
            <div className='navbarWrapper'>
                <h3 onClick={()=>navigate('/')}>BlogApp</h3>
                {
                    user ? <div className="button">
                        <button onClick={logoutUser}><i class="fa-solid fa-right-from-bracket"></i></button>
                        <Link to="/createblog">Create Blog</Link>
                    </div> : <div className="button">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }


            </div>
        </div>
    )
}

export default Navbar