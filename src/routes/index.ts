import { Router } from "express";
import authRoute from "./auth";
import onboardingRoute from "./onboarding";
import adminRoute from "./admin/admin-routes";
import orderRoute from "./orders";
import cartRoute from "./cart";
const router = Router();

router.use('/auth',authRoute)
router.use('/onboarding',onboardingRoute)
router.use('/admin',adminRoute)
router.use('/order',orderRoute)
router.use('/cart',cartRoute)


export default router;