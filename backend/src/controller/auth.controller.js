import { User } from '../model/auth.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { upsertServerClient } from '../lib/stream.js';
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
    await newUser.save();
    try {
      await upsertServerClient({
        id: newUser._id.toString(),
        name: newUser.username,
        image: newUser.profilePic
      });
      console.log('User upserted successfully');
      console.log(`Stream user created for user: ${newUser.username}`);

    } catch (error) {
      console.log('Error in upsertServerClient:', error);
      return res.status(500).json({ message: 'Error creating user in Stream' });
      
    }
    const generatedToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });     
    console.log('Generated token:', generatedToken);

    res.cookie('token', generatedToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      maxAge: 3600000 // 1 hour
    });
     
    newUser.token = generatedToken;
    console.log('User document before saving:', newUser);   
    

   
    res.status(201).json({ message: 'User created successfully' });

  } catch (error) {

    console.error('Error during signup:', error);
    res.status(500).send('Internal Server Error');

  }
   
}
export const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log('Received data:', email, password);
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isPasswordMatch =await user.comparePassword(password);
        console.log('Password match:', isPasswordMatch);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        user.token = token;
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
            maxAge: 3600000 // 1 hour
        });
        await user.save();
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error during login:', error);    
        res.status(500).send('Internal Server Error');
    }
    
}   

export const logout = async (req, res) => {
    try {
       res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set to true in production
        });
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        console.error('Error during logout:', error);   
        res.status(500).send('Internal Server Error');
    }
    
}