import { Router } from "express";
import { allProducts, filterProductsByPrice, getProductsByCategory } from "../controller/products-controller";
const router =Router()

router.get('/productt', allProducts)
router.get('/producttt', getProductsByCategory)
router.post('/productttt', filterProductsByPrice)

export default router