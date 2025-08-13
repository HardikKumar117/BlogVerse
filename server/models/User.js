 import mongoose from "mongoose";

 const userSchema =new mongoose.Schema({
    userid:{type:String},
    username:{type:String},
    password:{type:String,required:true},
    email:{type:String,required:true},
  
 })

 const User= mongoose.model("user",userSchema)
 export default User