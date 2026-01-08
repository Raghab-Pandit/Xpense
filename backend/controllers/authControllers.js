import jwt from 'jsonwebtoken';
import User from '../models/Users.js'

// Generate JWT token
const generatetoken= (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// Register User
export const registerUser = async (req, res) => {

    const { fullName, email, password, profileimgURL } = req.body;

    // Check if all the fields are filled
    if(!fullName || !email || !password){
        return res.status(400).json({message: 'All fields are required'})
    }

    try{
        // check if email already exists
        const existingUser = await User.findOne( { email } )
        if(existingUser){
            return res.status(400).json({ message: 'User with that email already Exists' })
        }

        // Register the User
        const user= await User.create({
            fullName,
            email,
            password,
            profileimgURL
        })

        res.status(201).json({
            id: user._id,
            user:{
                profileimgURL: user.profileimgURL,
                fullName: user.fullName,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
           token: generatetoken(user._id)
        })
    }
    catch(err){
        res.status(500).json({ message: 'Error Registering User' , error: err.message })
    }

}

// Log In User
export const loginUser = async ( req, res ) => {
    const {email, password} = req.body;
    
    // Check if all field are filled
    if( !email || !password ){
        return res.status(400).json({ message: 'All fields are required' })
    }

    try{
        const user= await User.findOne({ email });
        if(!user || !(await user.comparePassword(password))){
            return res.status(400).json({ message: 'Incorrect Email or Password' })
        }

        res.json({
            id: user._id,
            user,
            token: generatetoken(user._id)
        })
    }
    catch(err){
        res.status(500).json({ message: 'Error Logging In', error: err.message })
    }
}

// Get Users Info
export const getUser = async ( req, res ) => {

    try{
        const user = await User.findbyId(req.user.id).select('-password');  // '-' is used to Return the user document, but not include the password

        if(!user){
            return res.status(404).json({ message: 'User not Found' })
        }

        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({ message: 'Error fetching User', error: err.message })
    }

}