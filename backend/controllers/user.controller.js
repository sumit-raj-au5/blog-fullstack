const userModel = require('../models/user.model');
require('dotenv').config();
// for encrypting password
const bcrypt = require('bcrypt');

const userServices={
    //function to get all users
    async getAllUser(req,res,next){
    let users;
    try{
        //using mongoose function to find all users
        //returns array of users
        users = await userModel.find();
    }catch(err){
        if(process.env.DEBUG) console.log(`Error in fetching users ${err}`);
    }
    if(!users){
        return res.status(404).json({message:"No Users Found"});
    }
    return res.status(200).json({users});
    },

    //function to signup a user
    async signup(req,res,next){
        
        const {name, email, password} = req.body;
        //encrypting password
        const salt = await bcrypt.genSalt();
        const hashedPassword = bcrypt.hashSync(password, salt);

            //creating a new user using mongoose
            const user = new userModel({
                name,
                email,
                password:hashedPassword,
                blogs:[]
            });
        let error=null;
        try{
            //saving data to database using mongoose
            const returnedData = await user.save();
            if(process.env.DEBUG)console.log(`Returned data after signup ${returnedData}`);
            res.status(201).send({status:"success", data:user});
        }
        catch(err){
            if(process.env.DEBUG){
                console.log(`Error creating a new user ${err.message}`);
            } 
            res.status(400).send({status:"error", error:err.message});
        }
     
    },

    //function to signin
    async signin(req,res,next){
        const {email, password} = req.body;
        try{
            let user = await userModel.findOne({email});
            const stored_password=user.password;
            const entered_password=password;
            const passwordMatch = bcrypt.compareSync(entered_password, stored_password);
            if(passwordMatch){
                //const token = createToken(data._id);
                //res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(200).send({status:"Login Success", user:user.email, _id:user._id});
            }
            else{
                res.status(401).send({status:"error", error:"Wrong Email or Password"});
            }
        }
        catch(err){
            if(process.env.DEBUG)console.log(err);
            res.status(501).send({status:"error", error:err.message});
        }
    }
}
module.exports=userServices;