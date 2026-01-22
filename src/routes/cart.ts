import { Router } from "express";   
import { onBoardCheck } from "../middleware/onBoardCheck";
import { authMiddleWare } from "../middleware/authmiddleware";
import { cart, getCartItems } from "../controller/cart-controller";
const router = Router();  

router.use(onBoardCheck);
router.use(authMiddleWare)

router.post("/cart",cart)
router.get("/cart",getCartItems)

export default router;