import React from 'react'
import "./Post.scss"
import { useNavigate} from "react-router-dom"
const Post = ({ data }) => {
  const navigate=useNavigate();
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
  console.log(data)
  return (
    
      <div className='post' onClick={()=>navigate(`/editblog/${data._id}`)}>
        <div className="image">
          <img src={`http://localhost:4000/uploads/` + data.file} alt="postImage" />
        </div>
        <div className="description">
          <h1>{data.title}</h1>
          <span>{data.authorname}</span> <br /> <span>{formattedDate}</span>
          <p>{data.description}</p>

        </div>
      </div>
    
  )
}

export default Post