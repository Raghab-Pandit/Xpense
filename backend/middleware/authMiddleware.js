import jwt from 'jsonwebtoken'
import User from '../models/Users.js'

export const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({ message: "Not authorized, no token" })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Checks token structure - Confirms it was signed with your secret

        req.user = await User.findbyId(decoded._id).select('-password')
        next()
    }
    catch(err){
        res.status(401).json({ message : 'Not authorized, token failed' })
    }
}