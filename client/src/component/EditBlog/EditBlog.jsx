import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./EditBlog.scss";
import { UserContext } from '../../authcontext';
import { useNavigate, useParams } from 'react-router-dom';

const CreateBlog = () => {
    const navigate=useNavigate();
    const { id } = useParams();
    const [data, setdata] = useState({})
    const{user} =useContext(UserContext)
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      file: null,
    });
    useEffect(()=>{
        const fetchdata=async()=>
        {
            const response=await axios.get(`http://localhost:4000/editblog/${id}`)
            setdata(response.data)
            setFormData({
              title: response.data.title,
              description: response.data.description,
              file: response.data.file, // Assuming you don't want to update the file in the edit form
            });
        }
        fetchdata();
    },[])

    console.log(data)


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file }));
  };
  const handleUpdate = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);

    try {
      const response = await axios.put(`http://localhost:4000/updateblog/${id}`, formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if(response.status===200)
      {
        navigate('/');
      }

    } catch (error) {
      console.error( error.message);
      // Handle error
    }
  };
  console.log("formData=",formData)
  return (
    <div className='editwrapper'>
    <form onSubmit={handleUpdate}>
      <h1>Create Your Blog</h1>

      <label htmlFor="title">Enter the Title:</label> <br />
      <input type="text" name="title" id="title" value={formData.title} onChange={handleInputChange} required /><br /><br />

      <input type="file" name="file" id="file"  onChange={handleFileChange} />
      {data.file&&<p>File Name: <b>{data.file}</b></p>} <br /> <br />
     

      <label htmlFor="description">Description:</label> <br />
      <textarea id="description" name="description"  value={formData.description} rows="4" onChange={handleInputChange} required></textarea> <br /> <br />

      <input type="submit" value="Update Blog" />
    </form>
    </div>
  );
};

export default CreateBlog;
