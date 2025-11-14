import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import 'dotenv/config';
import { userModel } from '../model/user.js';
import { validationResult } from 'express-validator';

const register = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(401).json({
            success: false,
            errors : errors.array()
        })
    }
    try{
    let {
        username,
        firstname,
        lastname,
        email,
        password } = req.body;
        
        if (!username || !firstname || !lastname || !email || !password) {
            return res.statsu(400).json({
                success: false,
                message: "missing credientials."
            });
        }
        const checkEmail = await userModel.findOne({ email: email });
        const Username = await userModel.findOne({ username: username });

        if (checkEmail) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }
        if (Username) {
            return res.status(409).json({
                success: false,
                message: "Username already exists."
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        console.log(hashedPassword); 
        username = new userModel({
            username : username, 
            firstname :firstname,
            lastname : lastname,
            email : email,
            password :hashedPassword
        })

        await username.save();

        res.status(201).json({
            success: true,
            message: 'User registered successfully !'
        })

    } catch (e) {
        console.error(e);
        res.status(500).json({
            success: false, 
            message : e.message
        })
    }
} 

const login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(401).json({
            success: false,
            message: 'Enter email/username and password.'
        });
    }

    const User = await userModel.findOne({ $or: [{ email: username }, { username: username }] });
    if (!User) {
        return res.status(404).json({
            success: false,
            message: 'Invalid email/username and password'
        });
    }
    console.log(User);
    const checkPassword = await bcrypt.compare(password, User.password);
    if (!checkPassword) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email/username and password'
        })
    }
    const payload = {
        User: {
            username: User.username,
            role : User.role
        }

    }
    const token = await jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
            expiresIn: '15m'
        }
    );

    res.status(200).json({
        success: true,
        message: 'Logged in successfully!',
        token : token
    })
}

    
export {
    register,
    login
}
