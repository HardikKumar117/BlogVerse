import jwt from 'jsonwebtoken';
import Blog from '../models/Blog.js';
import Comment from '../models/Comments.js';
import { registerValidator } from '../validator/register-validator.js';
import {loginValidator} from '../validator/login-validator.js'
import bcrypt from 'bcrypt'
import User from '../models/User.js';
import {v4 as uuidv4} from 'uuid'
import verifyToken from '../configs/jwt.js';

// ADMIN LOGIN
export const adminLogin = async (req, res) => {
  try{
    const body=req.body;
    const {value,error}=loginValidator.validate(body);
    if(error){
      return res.status(400).json({message:error.details[0].message})
      console.log("error in validation:",error);
    }
    const user =await User.findOne({email:value.email});
    const email=value.email;
    if(!user){
      return res.status(404).json({message:"User not found"});
    }
    const isMatched=bcrypt.compareSync(value.password,user.password);
    if(!isMatched){
      return res.status(400).json({message:"Invalid password"});
    }
    else{
       const token = jwt.sign({ email, role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    console.log(token)
     res.json({ success: true,message:"Login Successful",token:token});}
     
  }catch(error){console.log("Login error is ",error)
    res.status(401).json({message:"Error in login",success:false})
  }
};

// GET ALL BLOGS
export const getAllBlogsAdmin = async (req, res) => {
  try {
    
    const blogs = await Blog.find({}).sort({ createdAt: -1 });
    res.json({ success: true, blogs });
  } catch (err) {
    console.error("Error in getAllBlogsAdmin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET ALL COMMENTS
export const getAllCommentsAdmin = async (req, res) => {
  try {
    const comments = await Comment.find({})
      .populate("blog")
      .sort({ createdAt: -1 });
    res.json({ success: true, comments });
  } catch (err) {
    console.error("Error in getAllCommentsAdmin:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DASHBOARD DATA
export const getDashboard = async (req, res) => {
  try {
     const token = req.headers.authorization;
    const actualToken = token.split(" ")[1];
    const email=verifyToken(actualToken);
    if(!email){
      res.status(404).json({message:"TOken not Found"})
    }
    const recentBlogs = await Blog.find({"email":email.email}).sort({ createdAt: -1 }).limit(5);
    const blogs = await Blog.countDocuments({"email":email.email});
    const comments = await Comment.countDocuments({"email":email.email});
    const drafts = await Blog.countDocuments({ isPublished: false ,"email":email.email});

    const dashboardData = { blogs, comments, drafts, recentBlogs };
    res.json({ success: true, dashboard: dashboardData });
  } catch (err) {
    console.error("Error in getDashboard:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// DELETE COMMENT BY ID
export const deleteCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const deleted = await Comment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment deleted", comment: deleted });
  } catch (err) {
    console.error("Error in deleteCommentById:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// APPROVE COMMENT BY ID
export const approveCommentById = async (req, res) => {
  try {
    const { id } = req.body;
    const updated = await Comment.findByIdAndUpdate(id, { isApproved: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: "Comment not found" });
    }

    res.json({ success: true, message: "Comment approved" });
  } catch (err) {
    console.error("Error in approveCommentById:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
export const adminRegister=async(req,res)=>{
  try{
    const reqbody=req.body;
    const id=uuidv4();
    console.log("body is ",reqbody)
    const {value,error}=registerValidator.validate(reqbody);
    console.log("value is ",value)
    if(error) return res.status(400).json({success:false,message:"error in validation"});
    const hashed=bcrypt.hashSync(value.password,10)
    const user=new User({
      userid:id,
      username:reqbody.name,
      email:reqbody.email,
      password:hashed
    })
    await user.save();
    console.log("user is",user)
    res.json({success:true,message:"user created successfully"})
  }catch(error){
    console.log("error is ",error)
     return res.status(404).json({ success: false, message: "Error in Registration" }

     );
  }
}