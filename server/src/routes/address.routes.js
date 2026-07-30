import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { addAddress, deleteAddress, getAddressbyId, getAllAddresses, updateAddress } from "../controllers/address.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/add").post(addAddress);
router.route("/").get(getAllAddresses);

router.route("/:addressId")
                            .get(getAddressbyId)
                            .patch(updateAddress)
                            .delete(deleteAddress);


export default router;