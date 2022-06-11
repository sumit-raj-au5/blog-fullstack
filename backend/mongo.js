const {MongoClient} = require('mongodb');
const mongoose = require('mongoose');
require('dotenv').config();
const DEBUG = +process.env.DEBUG;

const mongoConfig = {
    async connect(){
        //database connection
        let mongoConnect = await mongoose.connect(process.env.MONGODB_URL);
        if(DEBUG) {
            console.log(`MongoDB connected - ${process.env.MONGODB_URL}`);
        }

        // //selecting Database
        // this.db = client.db(process.env.MONGODB_DBNAME);
        // if(DEBUG) {console.log(`Database selected - ${process.env.MONGODB_DBNAME}`)};

        // //initializing collections
        // this.urlData = this.db.collection("urlData");
        // this.user = this.db.collection("user");
    }
}


module.exports=mongoConfig;