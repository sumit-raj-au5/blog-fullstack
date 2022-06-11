const express = require('express');
const app = express();
//getting env vars
require('dotenv').config()
//for CORS
const cors = require('cors');
//importing mongo config
const mongoConfig = require('./mongo');

//importing routes
const userRoute = require('./routes/user.routes');
const blogRoute = require('./routes/blog.routes');

const DEBUG=+process.env.DEBUG;
(
    async()=>{
        try{
            await mongoConfig.connect();
        }
        catch(err){
            if(DEBUG){
                console.log(`Error connecting MongoDB ${err}`);
            }
        }
        
        //middleware
        app.use(express.json());
        app.use(cors({ origin: true, credentials: true }));

        //Routes
        // app.use('/', shortURL);
        app.use('/userauth', userRoute);
        app.use('/blog', blogRoute);
        app.use('/', (req,res)=>{res.send('Welcome Home')});
        //starting backend on PORT
        app.listen(process.env.PORT, ()=>{
        if(DEBUG)
        console.log(`server running on ${process.env.PORT}`);
        });
    }
)();


