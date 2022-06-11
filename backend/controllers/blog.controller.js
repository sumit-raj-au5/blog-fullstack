const { default: mongoose } = require('mongoose');
const blogModel = require('../models/blog.model');
const userModel = require('../models/user.model');
require('dotenv').config();
const DEBUG = +process.env.DEBUG;

const blogServices={

    //function to get all blogs
    async getAllBlogs(req,res,next){
        let blogs=null;
        try{
            blogs = await blogModel.find();
            res.status(200).send({status:"success", data:blogs.reverse()});
        }
        catch(err){
            if(DEBUG){
                console.log(`Error in getting all blogs ${err.message}`)
            }
            res.status(501).send({status:"error", error:err.message});
        }
    },

    //function to add a new blog
    async addBlog(req,res,next){
        const {title, description, image, user} = req.body;

        //checking if valid user is making request to create a new blog
        let exhistingUser;
        try{
            exhistingUser = await userModel.findById(user);
        }
        catch(err){
            if(DEBUG){
                console.log(`Error finding user when creating a new blog ${err}`);
            }
        }

        if(!exhistingUser){
         res.status(301).send({status:"permission denied", data:"User doesn't exist"});
        }
        else{
        //creating blog using model
        const blog = new blogModel({
            title,
            description,
            image,
            user
        });
        try{
            //Now to add a blog we need to take care of both blog and user collection
            //starting a mongoose session
            const session = await mongoose.startSession();
            //starting a transaction in the session
            session.startTransaction();
            //saving blog in blog model
            //need to pass session too
           const blogSaveData =  await blog.save({session});
            //pushing this blog in blog array of the user who made request
            exhistingUser.blogs.push(blog);
            //saving user data in user collection
           const blogSaveUser =  await exhistingUser.save({session});
            //commiting and ending this session
            await session.commitTransaction();

            if(DEBUG){
                console.log(`New blog created. Saved blog ${blogSaveData}`);
                console.log(`Saved blog. user datails updated ${blogSaveUser}`)
            }
            res.status(200).send({status:"success", data:blogSaveData});
        }
        catch(err){
            if(DEBUG){
                console.log(`Error in adding new blog ${err.message}`);
            }
            res.status(501).send({status:"error", error:err.message});
        }
    }
    },

    //function to update a blog
    async updateBlog(req, res, next){
          const blogId = req.params.id;
          const {title, description} = req.body;
          try{
            const blog = await blogModel.findByIdAndUpdate(blogId,{
                title,
                description
            },
            {new:true});
            if(DEBUG){
                console.log(`Blog updated ${blog}`);
            }
            res.status(200).send({status:"success", data:blog});
          }
          catch(err){
            if(DEBUG){
                console.log(`Error in updating blog ${err.message}`);
            }
            res.status(501).send({status:"error", error:err.message});
          }
    },

    //function to get a blog by ID
    async getById(req,res,next){
        const blogId = req.params.id;
        try{
            const blog = await blogModel.findById(blogId);
            if(DEBUG){
                console.log(`Blog fetched by id ${blog}`);
            }
            res.status(200).send({status:"success", data:blog});
        }
        catch(err){
            if(DEBUG){
                console.log(`Error in fetching a blog ${err.message}`);
            }
            res.status(501).send({status:"error", error:err.message});
        }
    },

    //function to delete a blog by ID
    async deletedById(req,res,next){
        const blogId = req.params.id;
        try{
            //populate will give detail of referenced collection
            const blog = await blogModel.findByIdAndDelete(blogId).populate("user");
            //deleting blog from user array
            const deletedBlogFromUserID = await blog.user.blogs.pull(blog);
            //need to save after pulling
            await blog.user.save();

            if(DEBUG){
                console.log(`Blog deleted`);
                console.log(`Blog ID deleted from user ${deletedBlogFromUserID}`);
            }
            res.status(200).send({status:"success", data:blog});
        }
        catch(err){
            if(DEBUG){
                console.log(`Error in deleting a blog ${err.message}`);
            }
            res.status(501).send({status:"error", error:err.message});
        }
    },

    //function to fetch all blogs for one user
    async getBlogsByUserId (req,res,next){
        const userID = req.params.id;
        let userBlogs;
        try{
            userBlogs = await userModel.findById(userID).populate("blogs");
            if(!userBlogs){
                res.status(404).send({status:error, data:"no blogs found"});
            }
            res.status(200).send({status:"success", data:userBlogs});
        }
        catch(err){
            if(DEBUG)console.log(`Error fetching blog of a user ${err.message}`);
            res.status(500).send({status:"error", error:err.message});
        }
    }
}

module.exports = blogServices;