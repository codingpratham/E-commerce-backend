import { Request, Response } from "express";
import prisma from "../utils/prisma";

export const allProducts = async(req:Request , res:Response) =>{
    try {
        const products = await prisma.products.findMany({})

        res.status(200).json(products)
    } catch (error : Error | any) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}

export const getProductsByCategory =async(req:Request , res:Response)=>{
    try {
        const {category} = req.params

        if(!category){
            return res.status(400).json({message:"Category is required"})
        }

        const products = await prisma.products.findMany({
            where:{
                product_category: category as any
            }
        })

        res.status(200).json(products)
    } catch (error : Error | any) {
        res.status(500).json({
            error:error.message
        })
        console.log(error);
        
    }
}

export const filterProductsByPrice = async(req:Request , res:Response) =>{
    try {
        const {minPrice, maxPrice} = req.query
        if(!minPrice || !maxPrice){
            return res.status(400).json({message:"minPrice and maxPrice are required"})
        }

        const products = await prisma.products.findMany({
            where:{
                product_price:{
                    gte: String(minPrice),
                    lte: String(maxPrice)
                }
            }
        })

        res.status(200).json(products)

    }
    catch (error : Error | any) {
        res.status(500).json({message: error.message})
        console.log(error);
    }
}