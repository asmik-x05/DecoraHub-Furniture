import { verifyJWT } from "../utils/jwt.js";

const auth = async(req, res, next) => {
  const cookie=req.headers.cookie;
  if (!cookie) return res.status(401).send("User not authorized");
  const token = cookie.split("=")[1];
  if (!token) return res.status(401).send("User not authorized");
  try {
    const data=await verifyJWT(token);
    req.user=data;
    next();
  } catch (error) {
    return res.status(401).send("invalid token");
  }
  
};
export default auth;
