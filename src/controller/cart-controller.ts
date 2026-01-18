import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const cart = async (req:Request, res:Response) => {
    const userId  = req.userId
    if(!userId){
        res.status(401).json({error: 'Unauthorized'});
        return;
    }
    const {productId , quantity} = req.body;

    if(!productId || !quantity){
        res.status(400).json({error: 'Product ID and quantity are required'});
        return;
    }
    try {

        const price = await prisma.products.findUnique({
            where:{
                id: productId
            },
            select:{
                product_price: true
            }
        })
        if(!price){
            res.status(404).json({error: 'Product not found'});
            return;
        }
        
        if(quantity < 1){
            res.status(400).json({error: 'Quantity must be greater than 0'});
            return;
        }

        const totalPrice  = price.product_price as any  * quantity

        
        const cart = await prisma.cart.create({
            data:{
                userId: userId,
                productId: productId,
                quantity: quantity,
                price: totalPrice as any
            }
        })

        res.status(201).json({cart});
    } catch (error : Error | any) {
        res.status(500).json({error: error.message});
        console.log(error);
    
    }
}

export const getCartItems = async (req:Request, res:Response) => {
    const userId  = req.userId
    if(!userId){
        res.status(401).json({error: 'Unauthorized'});
        return;
    }

    try {
        const cartItems = await prisma.cart.findMany({
            where:{
                userId: userId
            },
            include:{
                products: true
            }
        })
        res.status(200).json({cartItems});
    } catch (error : Error | any) {
        res.status(500).json({error: error.message});
        console.log(error);
    }
}   