import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()



export const validateToken = (req, res, next) => {
    console.log('Authorization Header:', req.headers.authorization); // Log the header
  
    if (!req.headers.authorization) {
      return res.status(404).json({ message: 'Please send a token along' });
    }
  
    let token = req.headers.authorization;
    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length); 
    }
    
    console.log('Token after stripping Bearer:', token); 
  
    if (token) {
      jwt.verify(token, process.env.secrect, (err, data) => {
        if (data) {
          console.log('Token verified:', data); 
          next();
        } else {
          console.error('Token verification failed:', err);
          return res.status(400).json({ message: 'Invalid token', err });
        }
      });
    } else {
      return res.status(400).json({ message: 'No token provided' });
    }
  };
  