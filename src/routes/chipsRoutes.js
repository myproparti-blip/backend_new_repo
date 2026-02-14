import express from "express";
import { getChips, addChip, deleteChip, getAllClients } from "../controllers/chipsController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

// Health check (no auth required)
router.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Chips route is working" });
});

// Get all clients (auth required - masteradmin only)
router.get("/clients/list", authMiddleware, getAllClients);

// Get chips for a client (auth required)
router.get("/", authMiddleware, getChips);

// Add a chip (auth required - masteradmin only)
router.post("/", authMiddleware, addChip);

// Delete a chip (auth required - masteradmin only)
router.delete("/:id", authMiddleware, deleteChip);

export default router;
