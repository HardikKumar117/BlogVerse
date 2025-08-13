import jwt from "jsonwebtoken";




const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.log(err);
    throw new Error("Error in token Verification");
  }
};
export default verifyToken;