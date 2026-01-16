import { Request, Response } from "express";
import { productSchema, productType } from "../../schema/type";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    if(!userId){
        res.status(401).json({error: 'User Not Found'});
        return;
    }

    const product = productSchema.safeParse(req.body);

    if(!product.success){
        res.status(400).json({error: product.error});
        return;
    }

    const productData : productType= product.data;
    
    try {
        
    } catch (error : Error | any ) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}