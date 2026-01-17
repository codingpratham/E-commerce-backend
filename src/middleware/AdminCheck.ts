import { NextFunction, Request, Response } from "express";

export const AdminCheck = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userId = req.userId;

    if (!userId) {
        res.status(401).json({ error: 'AdminCheck Unauthorized' });
        return;
    }

    if (req.auth !== 'ADMIN') {
        res.status(403).json({ error: 'Forbidden' });
        return;
    }

    next();
}