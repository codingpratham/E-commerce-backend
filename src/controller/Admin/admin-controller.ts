import { Request, Response } from "express";
import { productSchema, productType } from "../../schema/type";
import prisma from "../../utils/prisma";
import cloudinary from "../../utils/cloudinary";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    const userId = req.userId;
    if(!userId){
        res.status(401).json({error: 'User Not Found'});
        return;
    }

    if(!req.file){
        res.status(400).json({error: 'Product image is required'});
        return;
    }

    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "photos" }, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(req.file!.buffer);
    });

    const photoUrl = uploadResult.secure_url;

    const product = productSchema.safeParse({
        ...req.body,
        photoUrl
    });

    if(!product.success){
        res.status(400).json({error: product.error});
        return;
    }


    const productData : productType= product.data;
    
    try {
        const newProduct = await prisma.products.create({
            data:{
                userId: userId,
                product_name: productData.name,
                product_about: productData.about,
                product_price: productData.price,
                product_category: productData.category, 
                product_image: photoUrl,
            }
        })
        res.status(201).json({message: 'Product created successfully', product: newProduct});
    } catch (error : Error | any ) {
        console.log(error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}