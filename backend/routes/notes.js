import express from "express";
import {addNotes,getNotes,getNoteByLoyer,deleteNotes,updateNotes} from "../controllers/notes.js"


const router = express.Router()


router.post("/addNotes", addNotes);
router.get("/getNotes", getNotes);
router.post("/getNoteByLoyer",getNoteByLoyer);
router.delete("/deleteNotes", deleteNotes);
router.put("/updateNotes",updateNotes)

export default router;