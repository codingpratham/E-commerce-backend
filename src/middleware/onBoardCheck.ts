import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      auth?: string;
      isOnBoarded?: boolean;
    }
  }
}

export const onBoardCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
    
  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isBoarded: true },
    });

    if (!user || user.isBoarded === false) {
      res.status(403).json({ error: "User onboarding incomplete" });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
