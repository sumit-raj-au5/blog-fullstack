import './App.css';
import Header from './components/Header';
import React from "react";
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import { useSelector } from 'react-redux';
import TheBlog from './components/TheBlog';

function App() {
  const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  console.log(isLoggedIn);
  return (
    <React.Fragment>
      <header>
        <Header/>
        <main>
          <Routes>
          {
            isLoggedIn?(<>
            <Route path="/" element={<Blogs/>}/>
            <Route path="/myBlogs" element={<UserBlogs/>}/>
            <Route path="/myBlogs/:id" element={<BlogDetails/>}/>
            <Route path="/addBlog" element={<AddBlog/>}/>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/viewBlog/:id" element={<TheBlog/>}/>
            </>)
            :
            (<>
            <Route path="/" element={<Blogs/>}/>
            <Route path="/blogs" element={<Blogs/>}/>
            <Route path="/auth" element={<Login/>}/>
            <Route path="/viewBlog/:id" element={<TheBlog/>}/>
            </>)
          }
            
            
          </Routes>
        </main>
      </header>
    </React.Fragment>      
    
  );
}

export default App;
