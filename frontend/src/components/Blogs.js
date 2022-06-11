import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import ReactHtmlParser from 'react-html-parser';
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const truncate = (str, n) => (str?.length>n?str.substr(0, n-1) + '...':str)

  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_ALL_BLOGS_URL}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data.data);
    return data.data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data));
  }, []);
  
  return (
    <div style={{display:"flex", flexDirection:"column"}}>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={ReactHtmlParser(truncate(blog.description,100))}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
