import express from "express";
import {
  getInvite,
  sendInvite,
  acceptInvitation,
  refusInvitation
} from "../controllers/invite.js";

const router = express.Router();

router.get("/:id", getInvite);
router.put("/:id", acceptInvitation);
router.post("/", sendInvite);
router.delete("/:id",refusInvitation)
export default router;
