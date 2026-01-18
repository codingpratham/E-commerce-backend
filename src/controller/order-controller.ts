import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const placeOrder = async (req: Request, res: Response) => {
    const userId = req.userId;
    if (!userId) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const cartId  = req.params;

    if (!cartId) {
        res.status(400).json({ error: 'Cart ID is required' });
        return;
    }

    try {
        const cart = await prisma.cart.findUnique({
            where: {
                id: cartId as any
            },
            include: {
                products: true
                
            }
        });
        
        if (!cart) {
            res.status(404).json({ error: 'Cart not found' });
            return;
        }

        const order = await prisma.orders.create({
            data: {
                userId: userId,
                cartId: cartId as any,
                totalPrice:cart.price,
                status: "pending",
            }
        });

        await prisma.cart.delete({
            where: {
                id: cartId as any
            }
        });

        res.status(201).json({ order })
    } catch (error : Error | any) {
        res.status(500).json({ error: error.message });
        console.log(error);
    }
}