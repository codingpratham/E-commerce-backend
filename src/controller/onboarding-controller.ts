import { Request, Response } from "express";
import { onBoardingSchema, onBoardingType } from "../schema/type";
import prisma from "../utils/prisma";

export const onboarding  = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    
    if(!userId){
        res.status(401).json({error: 'Unauthorized'});
        return;
    }

    const onBoardings = onBoardingSchema.safeParse(req.body);

    if(!onBoardings.success){
        res.status(400).json({error: onBoardings.error});
        return;
    }
    const onBoardingData : onBoardingType = onBoardings.data;

    try {
        
        const onboard = await prisma.onBoarding.create({
            data:{
                userId: userId,
                name: onBoardingData.name,
                email: onBoardingData.email,
                phone: onBoardingData.phone,
                address: onBoardingData.address,
                completed: true,
            }
        })
        await prisma.user.update({
            where:{
                id: userId,
            },
            data:{
                isBoarded: true,
            }
        })
        res.status(200).json({message: 'Onboarding completed successfully', onboard: onboard});
    } catch (error : Error | any) {
        res.status(500).json({error: error.message});
        console.log(error);
        
    }
}