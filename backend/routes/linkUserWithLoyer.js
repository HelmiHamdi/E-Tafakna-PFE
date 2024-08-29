import express from "express";
import {addLink,getLinks,getLinksByLoyer,deleteUser,deleteLink,getUsersByLoyer,getUsersByCountry} from "../controllers/linkUserWithLoyer.js"

const router = express.Router()

router.post("/addLink",addLink);
router.get("/getLinks",getLinks);
router.post("/getLinksByLoyer",getLinksByLoyer);
router.post("/getUsersByLoyer",getUsersByLoyer)
router.delete("/deleteLink",deleteLink)
router.delete("/deleteUser",deleteUser)
router.post("/getUsersByCountry",getUsersByCountry)
export default router;