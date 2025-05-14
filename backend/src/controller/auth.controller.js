import { User } from '../model/auth.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


export const signup = async (req, res) => {
  try {
  
    const {email , password , username} = req.body;
    console.log('Received data:', email, password, username);
    
    if(!email || !password || !username) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    // Check if the user already exists
    const existingUser = await User.find({ email });

    if (existingUser.length < 0) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }; 
    const idx = Math.floor(Math.random() * 100)+1;
    const ranndomAvatar = `https://api.dicebear.com/5.x/avataaars/svg?seed=${idx}`;
    console.log('Random avatar URL:', ranndomAvatar);

    const newUser = new User({
      email,
      password,
      profilePic: ranndomAvatar,
      username
    });
    const generatedToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });     
    console.log('Generated token:', generatedToken);
     
    newUser.token = generatedToken;
    console.log('User document before saving:', newUser);   
    

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {

    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');

  }
   
}
export const login = async (req, res) => {

    try {
        res.send('Login endpoint');
    } catch (error) {
        console.error('Error during login:', error);    
        res.status(500).send('Internal Server Error');
    }
    
}   

export const logout = async (req, res) => {
    try {
        res.send('Logout endpoint');
    } catch (error) {
        console.error('Error during logout:', error);   
        res.status(500).send('Internal Server Error');
    }
    
}