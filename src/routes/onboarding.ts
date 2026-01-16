import { Router } from "express";
import { onBoardCheck } from "../middleware/onBoardCheck";
import { onboarding } from "../controller/onboarding-controller";
const router = Router();

router.use(onBoardCheck)

router.post('/onboard',onboarding)

export default router;