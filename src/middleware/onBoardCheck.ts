import { NextFunction, Request, Response } from "express";
import prisma from "../utils/prisma";

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

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }


    if (!user.isBoarded) {
      res.status(403).json({
        error: "Onboarding required",
        action: "REDIRECT_TO_ONBOARDING"
      });
      return;
    }

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
