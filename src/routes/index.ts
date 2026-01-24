import { Router } from "express";
import authRoute from "./auth";
import onboardingRoute from "./onboarding";
import adminRoute from "./admin/admin-routes";
import orderRoute from "./orders";
import cartRoute from "./cart";
import productRouter from "./products";
const router = Router();

router.use('/auth',authRoute)
router.use('/onboarding',onboardingRoute)
router.use('/admin',adminRoute)
router.use('/order',orderRoute)
router.use('/cart',cartRoute)
router.use('/product',productRouter)


export default router;