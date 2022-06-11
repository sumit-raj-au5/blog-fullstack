const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new Schema({
    name:{
        type:String,
        trim: true,
        lowercase: true,
        required:true
    },
    email:{
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:true
    },
    //a user can have multiple blogs so storing it in array 
    //type is a mongoose object
    //ref is collection name of the document
    blogs:[{type: mongoose.Types.ObjectId, ref:"Blog"}]
});

//it will make a collection 'users'
module.exports = mongoose.model("User", userSchema);