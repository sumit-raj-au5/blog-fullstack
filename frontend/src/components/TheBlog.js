import React, { useEffect, useState } from "react";
import {useParams } from "react-router-dom";
import axios from "axios";
import Blog from "./Blog";
import ReactHtmlParser from 'react-html-parser';
const Home = () => {
    const [blog, setBlog] = useState();
    const id = useParams().id;
    console.log(id);

  const fetchDetails = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_GET_BLOG_URL}/${id}`)
      .catch((err) => console.log(err));
    const data = res;
    console.log(data.data.data);
    return data.data.data;
  }; 

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data);
    });
  },[]);

  console.log(blog);
  return (
      <>
        {blog && <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={ReactHtmlParser(blog.description)}
            imageURL={blog.image}
            userName={blog.user.name}
          />}
          </>
  )
}

export default Home