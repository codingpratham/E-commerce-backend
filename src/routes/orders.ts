import { Router } from "express";
import { placeOrder } from "../controller/order-controller";
import { onBoardCheck } from "../middleware/onBoardCheck";
import { authMiddleWare } from "../middleware/authmiddleware";

const router = Router()

router.use(onBoardCheck)
router.use(authMiddleWare)

router.post('/order/:id',placeOrder)

export default router