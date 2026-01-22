import { Router } from "express";
import { authMiddleWare } from "../../middleware/authmiddleware";
import { AdminCheck } from "../../middleware/AdminCheck";
import { createProduct, deleteProduct, getProducts, totalOrders, totalRevenue, updateOrder } from "../../controller/Admin/admin-controller";
import { upload } from "../../utils/multer";
import { onBoardCheck } from "../../middleware/onBoardCheck";
const router = Router();

router.use(authMiddleWare)
router.use(onBoardCheck)
router.use(AdminCheck)

router.post('/product',upload.single('photos'),createProduct)
router.get('/product',getProducts)
router.get('/products',totalOrders)
router.get('/product-rev',totalRevenue)
router.put('/order/:id',updateOrder)
router.delete('/product/:id',deleteProduct)


export default router;