import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()



export const validateToken = (req, res, next) => {
   try {
    if (!req.headers.authorization) {
      return res.status(404).json({ message: 'Please send a token along' });
    }
  
    let token = req.headers.authorization;
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length); 
    }
    if (token) {
      jwt.verify(token, process.env.secrect, (err, data) => {
        if (data) {
          req.user = data
          next();
        } else {
          console.error('Token verification failed:', err);
          return res.status(400).json({ message: 'Invalid token', err });
        }
      });
    } else {
      return res.status(400).json({ message: 'No token provided' });
    }
   } catch (error) {
    return res.status(500).json({message : "internal server error"})
   }
  };
  