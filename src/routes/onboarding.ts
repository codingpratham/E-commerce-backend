import { Router } from "express";
import { onBoardCheck } from "../middleware/onBoardCheck";
import { onboarding } from "../controller/onboarding-controller";
import { authMiddleWare } from "../middleware/authmiddleware";
const router = Router();

router.use(authMiddleWare)


router.post('/onboard',onboarding)

export default router;