import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      auth?: string;
    }
  }
}

export const authMiddleWare = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        res.status(401).json({ error: 'token Unauthorized' });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string, auth: string };
        
        req.userId = decoded.userId;
        req.auth = decoded.auth;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: 'auth middle ware fail Unauthorized' });
        return;
    }
}