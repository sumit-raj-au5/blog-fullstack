import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import ReactHtmlParser from 'react-html-parser';


const UserBlogs = () => {
  const [user, setUser] = useState({"status":"blank"});
  const id = localStorage.getItem("userId");

  const truncate = (str, n) => (str?.length>n?str.substr(0, n-1) + '...':str);

  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_USER_BLOG_URL}/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    console.log(data.data);
    return data.data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data));
  }, []);
  
  return (
    <div>
      {" "}
      {user &&
        user.blogs &&
        user.blogs.map((blog) =>
        (
          <Blog
            id={blog._id}
            key={blog._id}
            isUser={true}
            title={blog.title}
            description={ReactHtmlParser(truncate(blog.description,100))}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
