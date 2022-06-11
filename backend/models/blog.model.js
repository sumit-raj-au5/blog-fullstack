const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        image:{
            type:String
        },
        //referencing user as a mongoose object
        //ref is collection name of the reference
        user:{
            type:mongoose.Types.ObjectId,
            ref:"User",
            required: true
        }
    },
);

module.exports = mongoose.model("Blog", blogSchema);