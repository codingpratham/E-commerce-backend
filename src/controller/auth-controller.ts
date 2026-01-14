import { Request, Response } from "express";
import {  RegisterSchema, RegisterType } from "../schema/type";
import prisma from "../utils/prisma";


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

    } catch (error : Error | any) {
        res.status(500).json({error: error.message});
        console.log('====================================');
        console.log(error);
        console.log('====================================');
    }
    
}