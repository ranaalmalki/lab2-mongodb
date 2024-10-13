import User from '../models/userSchema.js';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';

export const singup = async (req, res) => {
    const {username,email,password}=req.body
    const existingUser = await User.findOne({ email })
    if(existingUser){
    return res.status(400).json({ message: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        username, email, password: hashedPassword 
        });
        await newUser.save();
        
    const token = jwt.sign({ id: newUser._id , email: newUser.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ message: 'User registered successfully', user: newUser, token: token });
        

}

export const login = async (req, res) => {

    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if (!user){ return  res.status(400).json({ message: 'User not found' });
    }
   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){
        return res.status(400).json({ message: 'Invalid credentials' });

    }
    res.status(200).json({ message: 'Login successful', user });

} catch (error) {

res.status(500).json({ message: 'Server error', error });

}
}


export const getUsers = async (req, res) => {
    try{
        const user = await User.findById(req.params.id).populate('books');
        if (!user){ return res.status(404).json({ message: 'User not found' });
    }
        res.status(200).json(user)
    } catch (error) {

        console.error(error);
        
        res.status(500).json({ message: 'Error retrieving user', error });
        
        }
}