import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "hospital"
    }).then(()=>{
        console.log("connected to mongodb");
    }).catch((err)=>{
        console.log(`some error: ${err}`);
    });
};