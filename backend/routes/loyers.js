import express from "express";
import { getLoyer, getLoyers, updateLoyer, deleteLoyer, getLoyerByEmail, updatePicture } from "../controllers/loyers.js";


const router = express.Router()


router.post("/getLoyer",getLoyer)
router.post("/getLoyerByEmail",getLoyerByEmail)
router.get("/getLoyers",getLoyers)
router.put("/updateLoyer", updateLoyer)
router.delete("/deleteLoyer",deleteLoyer)
router.put("/updatePicture",updatePicture)

export default router;