import express from "express";
import {
  addFiles,
  getFiles,
  getFilesByLoyer,
  deleteFiles,
  updateFiles,
  uploadFile,
  handleUpload
} from "../controllers/files.js";

const router = express.Router();

router.post("/", addFiles);
router.get("/getFiles", getFiles);
router.get("/getFilesByLoyer/:id", getFilesByLoyer);
router.delete("/deleteFiles", deleteFiles);
router.put("/updateFiles", updateFiles);
router.post("/upload", uploadFile, handleUpload);
export default router;
