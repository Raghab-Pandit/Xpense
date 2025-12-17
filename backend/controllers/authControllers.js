import jwt from 'jsonwebtoken';
import User from '../models/Users.js'

// Generate JWT token
const generatetoken= (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// Register User
export const registerUser = async (req, res) => {}

// Log In User
export const loginUser = async ( req, res ) => {}

// Get Users Info
export const getUser = async ( req, res ) => {}