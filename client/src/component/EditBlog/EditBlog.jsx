import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import "./EditBlog.scss";
import { UserContext } from '../../authcontext';
import { useParams } from 'react-router-dom';

const CreateBlog = () => {
    const { id } = useParams();
    const [data, setdata] = useState({})
    useEffect(()=>{
        const fetchdata=async()=>
        {
            const response=await axios.post(`http://localhost:4000/editblog/${id}`)
            setdata(response.data)
        }
        fetchdata();
    },[])

    console.log(data)

  const{user} =useContext(UserContext)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevData) => ({ ...prevData, file }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);

    try {
      const response = await axios.post('http://localhost:4000/createblog', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user}`,
        },
      });

      console.log('Blog created successfully:', response.data);
      // Handle success (redirect, show a message, etc.)

    } catch (error) {
      console.error('Error creating blog:', error.message);
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>Create Your Blog</h1>

      <label htmlFor="title">Enter the Title:</label> <br />
      <input type="text" name="title" id="title" value={data.title} onChange={handleInputChange} required /><br /><br />

      <input type="file" name="file" id="file"  onChange={handleFileChange} /> <br /> <br />

      <label htmlFor="description">Description:</label> <br />
      <textarea id="description" name="description"  value={data.description} rows="4" onChange={handleInputChange} required></textarea> <br /> <br />

      <input type="submit" value="Create Blog" />
    </form>
  );
};

export default CreateBlog;
