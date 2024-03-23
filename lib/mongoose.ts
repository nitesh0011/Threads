import mongoose from "mongoose";
let isConnected = false;
export const connect = async () => {
    mongoose.set("strictQuery",true);

    if(!process.env.MONGOURI){
        console.log('mongouri not found')
    }
    if(isConnected){
        console.log('already connected to mongo db')
    }

    try {
        await mongoose.connect(process.env.MONGOURI!)
        isConnected = true;
        console.log('connected to mongo db')
    } catch (error:any) {
        console.log("error",error.message)
    }
}