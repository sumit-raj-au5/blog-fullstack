import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from 'react-quill';
//it is important to import React Quill Css for styling
import 'react-quill/dist/quill.snow.css';
import './AddBlog.css';

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);

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
      setInputs({
        title: data.title,
        description: data.description,
        imageURL: data.image
      });
    });
  }, [id]);

  const sendRequest = async () => {
    const res = await axios
      .put(`${process.env.REACT_APP_UPDATE_BLOG_URL}/${id}`, {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  console.log(blog);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    if (inputs.title !== "" && inputs.description !== "") {
      setLoading(true);
      try {
        sendRequest()
        .then((res) => {
          alert('Blog Edited Successfully');
          setLoading(false);
        })
        .then(() => navigate("/myBlogs/"));
      }
      catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  }

    return (
      <div>
    
          <div className='add-question'>
            <div className="add-question-container">
              <div className="head-title">
                <h1>Edit this blog</h1>
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
                onClick={handleSubmit}>{loading ? 'Editing Blog...' : 'Submit your Blog'}
              </button>
            </div>
          </div>
      </div> 
    );
  }
export default BlogDetail;