import { Request, Response } from "express";
import {  LoginSchema, LoginType, RegisterSchema, RegisterType } from "../schema/type";
import prisma from "../utils/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';


export async function register(req: Request, res: Response): Promise<void> {
    const Register  = RegisterSchema.safeParse(req.body);

    if(!Register.success){
        res.status(400).json({error: Register.error});
        return;
    }

    const registerData: RegisterType = Register.data;

    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                name: registerData.name,
            },
        });

        if(existingUser){
            res.status(400).json({error: 'User already exists'});
            return;
        }

        const salt = await bcrypt.genSalt(10);
        registerData.password = await bcrypt.hash(registerData.password, salt);


        const newUser = await prisma.user.create({
            data:{
                name: registerData.name,
                password: registerData.password,
                authType: registerData.authType,
                isBoarded: false,
            }
        })

        const token = jwt.sign({
            userId: newUser.id,
            auth : newUser.authType,
        },process.env.JWT_SECRET as string, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })



        res.status(201).json({message: 'User registered successfully', userId: newUser , token: token});

    } catch (error : Error | any) {
        res.status(500).json({error: error.message});
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
    
}

export async function login(req: Request, res: Response): Promise<void> {
    const logins = LoginSchema.safeParse(req.body);
    if(!logins.success){
        res.status(400).json({error: logins.error});
        return;
    }

    const LoginData : LoginType =  logins.data 

    try {
        const user =  await prisma.user.findUnique({
            where:{
                name: LoginData.name,
            }
        })

        if(!user){
            res.status(400).json({error: 'Invalid credentials'});
            return;
        }
        const isPasswordValid = await bcrypt.compare(LoginData.password, user.password);
        if(!isPasswordValid){
            res.status(400).json({error: 'Invalid credentials'});
            return;
        }
        const token = jwt.sign({
            userId: user.id,
            auth : user.authType
        },process.env.JWT_SECRET as string, {expiresIn: '7d'});

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        })

        res.status(200).json({message: 'Login successful', token: token , userId: user});

    } catch (error : Error | any) {
        res.status(500).json({error: error.message});
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
}

export function logout(req: Request, res: Response): void {
    res.clearCookie('token');
    res.status(200).json({message: 'Logout successful'});
}