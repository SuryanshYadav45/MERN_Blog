import React, { useContext } from 'react'
import "./Navbar.scss"
import { Link } from 'react-router-dom'
import { UserContext } from "../../authcontext"
const Navbar = () => {

    const { user,logoutUser } = useContext(UserContext);
    return (
        <div className='navbar'>
            <div className='navbarWrapper'>
                <h3>BlogApp</h3>
                {
                    user ? <div className="button">
                        <button onClick={logoutUser}>logout</button>
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