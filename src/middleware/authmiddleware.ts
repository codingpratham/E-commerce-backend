import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'

export const authMiddleWare  = async  ( req : Request , res : Response , next : NextFunction) =>{
    const token = req.cookies.token;

    if(!token){
        res.status(401).json({error: 'Unauthorized'});
        return;
    }

    try {
        const decoded = jwt.verify(token , process.env.JWT_SECRET as string) as {id:string , auth:string}
        const payload = {id:decoded.id , auth:decoded.auth}

        req.userId = payload.id
        req.auth = payload.auth
        next(); 
    } catch (error:Error | any ) {
        console.log(error);
        res.status(500).json({error: 'Unauthorized'});
        return;
    
    }

}