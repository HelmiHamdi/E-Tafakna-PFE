import express from "express";
import {getUser,getUsers,deleteUser} from "../controllers/users.js"

const router = express.Router()


router.post("/getUser",getUser)
router.get("/getUsers",getUsers)
router.delete("/deleteUser",deleteUser)


export default router;