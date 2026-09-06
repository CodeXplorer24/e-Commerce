import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addtoCart, getCart, removeProduct, reduceProductCount } from "../controllers/cart.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/").get(getCart);
router.route("/:productId").post(addtoCart);
router.route("/:productId").delete(removeProduct);
router.route("/:productId").patch(reduceProductCount)

export default router;