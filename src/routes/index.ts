import { Router } from "express";
import authRoute from "./auth";
import onboardingRoute from "./onboarding";
import adminRoute from "./admin/admin-routes";
const router = Router();

router.use('/auth',authRoute)
router.use('/onboarding',onboardingRoute)
router.use('/admin',adminRoute)


export default router;