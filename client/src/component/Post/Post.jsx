import React, { useContext,useEffect,useState } from 'react'
import "./Post.scss"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../authcontext"
import { jwtDecode } from 'jwt-decode'

const Post = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const [author, setauthor] = useState(false)
  let userid;
  
   useEffect(()=>
   {
    if (user) {
      const decode = jwtDecode(user);
      const { userId } = decode;
      userid=userId;}
   if (userid === data.authorId) {
    setauthor(true);
 
  }else {
    setauthor(false); // Reset author state when user logs out
  }
},[user,data.authorId])
   console.log(author);
  

   
  
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

    <div className='post' >

      <div className="image">
        <img src={`http://localhost:4000/uploads/` + data.file} alt="postImage" />
      </div>
      <div className="description">
        {author? <i class="fa-solid edit fa-pen-to-square" onClick={() => navigate(`/editBlog/${data._id}`)} ></i>: null }
        <h1>{data.title}</h1>
        <span>{data.authorname}</span> <br /> <span>{formattedDate}</span>
        <p>{data.description}</p>
        <button onClick={() => navigate(`/singleBlog/${data._id}`)} >Read More</button>
      </div>
    </div>

  )
}

export default Post