//import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from 'react-quill';
//it is important to import React Quill Css for styling
import 'react-quill/dist/quill.snow.css';
import './AddBlog.css';

//const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };

const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleQuillEdit = (value) => {
    setInputs((prevState) => ({
      ...prevState,
      description: value
    })
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.title !== "" && inputs.description !== "") {
      setLoading(true);
      const bodyJSON = {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      }

      await axios
        .post(process.env.REACT_APP_ADD_BLOG_URL, bodyJSON)
        .then((res) => {
          alert('Blog Added Successfully');
          setLoading(false);
          navigate("/blogs");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }

  return (
    <div className='add-question'>
      <div className="add-question-container">
        <div className="head-title">
          <h1>Add a blog</h1>
        </div>
        <div className="question-container">
          <div className="question-options">
            <div className="question-option">
              <div className="title">
                <h3>
                  Title
                </h3>
                <small>Keep title sweet and short</small>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder='Add question title'
                  value={inputs.title}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="question-option">
              <div className="body">
                <h3>
                  Body
                </h3>
                <small>You can use styling to write this blog</small>
                <ReactQuill
                  className='react-quill'
                  theme='snow'
                  value={inputs.description}
                  onChange={handleQuillEdit}
                />
              </div>
            </div>

            <div className="question-option">
              <div className="title">
                <h3>
                  Image URL
                </h3>
                <small>Add a image in your blog</small>
                <input
                  type="text"
                  id="title"
                  name='imageURL'
                  placeholder='Enter Image URL'
                  value={inputs.imageURL}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          className='button'
          type='submit'
          disabled={loading}
          onClick={handleSubmit}>{loading ? 'Adding Blog...' : 'Add your Blog'}</button>
      </div>
    </div>

  );
};

export default AddBlog;
