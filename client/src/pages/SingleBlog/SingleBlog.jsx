import React, { useContext, useEffect, useState } from 'react'
import "./SingleBlog.scss"
import axios from 'axios'
import {  useNavigate, useParams } from 'react-router-dom'
import { UserContext } from "../../authcontext"
import { jwtDecode } from 'jwt-decode'

const SingleBlog = () => {
  const { id } = useParams();
  const navigate=useNavigate();
  const [data, setdata] = useState({})
  const { user } = useContext(UserContext)
  const [author, setauthor] = useState(false)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/singleblog/${id}`);
        const decodedUser = user ? jwtDecode(user) : null;
        const userId = decodedUser ? decodedUser.userId : null;

        setdata(response.data[0]);
        
        setauthor(userId === response.data[0].authorId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchdata();
  }, [user, id]);

  const formattedDate = new Date(data.date).toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata', // Adjust time zone as needed
    hour12: true,
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZoneName: 'short',
  });
  return (
    <div className="singleblog">
      <div className='singleblogWrapper'>
        {data.file && <img src={`http://localhost:4000/uploads/` + data.file} alt="" />}
        <h1>{data.title}</h1>
        <div className="author">
          <b>{data.authorname}</b><br />
          <span>{formattedDate}</span>
          {author == true && <><br/><button className='editbtn' onClick={()=>navigate(`/editblog/${id}`)}>Edit Blog</button> </>}
          
        </div>

        <p>{data.description}
        </p>

      </div>
    </div>
  )
}

export default SingleBlog