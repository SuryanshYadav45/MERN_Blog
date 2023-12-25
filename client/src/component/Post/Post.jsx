import React, { useContext, useEffect, useState } from 'react'
import "./Post.scss"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../authcontext"
import { jwtDecode } from 'jwt-decode'

const Post = ({ data }) => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext)
  const [author, setauthor] = useState(false)
  useEffect(() => {
    try {
      const decode = user ? jwtDecode(user) : null;
      console.log("this is decoded value", decode)
      const userId = decode ? decode.userId : null;
      console.log("this is the userId", userId)
      setauthor(userId === data.authorId)
    } catch (error) {
      console.log("error occured", error)
    }

  }, [user, data.authorId])




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
        {author ? <i className="fa-solid edit fa-pen-to-square" onClick={() => navigate(`/editBlog/${data._id}`)} ></i> : null}
        <h1>{data.title}</h1>
        <span>{data.authorname}</span> <br /> <span>{formattedDate}</span>
        <p>{data.description}</p>
        <button onClick={() => navigate(`/singleBlog/${data._id}`)} >Read More</button>
      </div>
    </div>

  )
}

export default Post