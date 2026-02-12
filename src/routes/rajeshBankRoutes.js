import express from "express";
import multer from "multer";
import {
    createRajeshBank,
    getRajeshBankById,
    getAllRajeshBank,
    updateRajeshBank,
    managerSubmitRajeshBank,
    requestReworkRajeshBank,
    deleteRajeshBank,
    deleteMultipleRajeshBank,
    getLastSubmittedRajeshBank
} from "../controllers/rajeshBankController.js";
import { authMiddleware, isManagerOrAdmin } from "../middleware/authMiddleware.js";

// FILE UPLOAD HANDLER
const storage = multer.memoryStorage();

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        // Accept all file types
        cb(null, true);
    }
});

const router = express.Router();

// Create new Rajesh Bank form
router.post("", authMiddleware, createRajeshBank);

// Get all Rajesh Bank forms (with role-based filtering)
router.get("", authMiddleware, getAllRajeshBank);

// Get last submitted form for autofilling
router.get("/last-form/prefill", authMiddleware, getLastSubmittedRajeshBank);

// Get by ID
router.get("/:id", authMiddleware, getRajeshBankById);

// Update Rajesh Bank form (only user can update their own pending form)
router.put(
    "/:id",
    authMiddleware,
    (req, res, next) => {
        upload.any()(req, res, (err) => {
            if (err) {
                return res.status(400).json({ success: false, message: "File upload error", error: err.message });
            }
            next();
        });
    },
    updateRajeshBank
);

// Manager/Admin submit action (approve/reject)
router.post("/:id/manager-submit", authMiddleware, isManagerOrAdmin, managerSubmitRajeshBank);

// Manager/Admin request rework (only for approved items)
router.post("/:id/request-rework", authMiddleware, isManagerOrAdmin, requestReworkRajeshBank);

// Delete multiple Rajesh Bank (must be before single delete)
router.post("/bulk/delete", authMiddleware, deleteMultipleRajeshBank);

// Delete single Rajesh Bank
router.delete("/:id", authMiddleware, deleteRajeshBank);

export default router;
