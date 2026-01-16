import { Router } from "express";
import { authMiddleWare } from "../../middleware/authmiddleware";
import { AdminCheck } from "../../middleware/AdminCheck";
import { createProduct } from "../../controller/Admin/admin-controller";
import { upload } from "../../utils/multer";
import { onBoardCheck } from "../../middleware/onBoardCheck";
const router = Router();

router.use(authMiddleWare)
router.use(onBoardCheck)
router.use(AdminCheck)

router.post('/product',upload.single('photos'),createProduct)

export default router;