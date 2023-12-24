import React, { useEffect, useState } from "react";
import "./Home.scss";
import Post from "../../component/Post/Post";

const Home = () => {
    const [blog, setBlog] = useState([]);
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch("http://localhost:4000/getblog")
                const data = await response.json();
                setBlog(data)
                
            } catch (error) {
                console.log("error occured while fetching the data:", error)
            }
        }
        fetchdata();
    }, [])
    if(blog.length>0){
    console.log(blog)
    }
    return (
        <div className="homeWrapper">
        {
            blog.map((singleBlog)=>
            {
               return <Post data={singleBlog} />
            })
        }
            
            
        </div>
    );
};

export default Home;
