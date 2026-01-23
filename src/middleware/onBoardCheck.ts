import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

export const onBoardCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  const userId = req.userId;

  if (!userId) {
    res.status(401).json({ error: "onBoardCheck Unauthorized" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isBoarded: true},
    });

    if (!user) {
       res.status(404).json({ error: "onBoardCheck User not found" });
       return;
    }

    if (user.isBoarded === false) {
      next();
      return;
    }
    next()
  } catch (error) {
    res.status(500).json({ error: "onBoardCheck Internal server error" });
  }
};
