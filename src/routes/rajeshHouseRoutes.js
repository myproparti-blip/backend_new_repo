import express from "express";
import multer from "multer";
import {
    createRajeshHouse,
    getRajeshHouseById,
    getAllRajeshHouse,
    updateRajeshHouse,
    managerSubmitRajeshHouse,
    requestReworkRajeshHouse,
    deleteRajeshHouse,
    deleteMultipleRajeshHouse,
    getLastSubmittedRajeshHouse
} from "../controllers/rajeshHouseController.js";
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

// Create new Rajesh House form
router.post("", authMiddleware, createRajeshHouse);

// Get all Rajesh House forms (with role-based filtering)
router.get("", authMiddleware, getAllRajeshHouse);

// Get last submitted form for autofilling
router.get("/last-form/prefill", authMiddleware, getLastSubmittedRajeshHouse);
// Get by ID
router.get("/:id", authMiddleware, getRajeshHouseById);

// Update Rajesh House form (only user can update their own pending form)
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
    updateRajeshHouse
);

// Manager/Admin submit action (approve/reject)
router.post("/:id/manager-submit", authMiddleware, isManagerOrAdmin, managerSubmitRajeshHouse);

// Manager/Admin request rework (only for approved items)
router.post("/:id/request-rework", authMiddleware, isManagerOrAdmin, requestReworkRajeshHouse);

// Delete multiple Rajesh House (must be before single delete)
router.post("/bulk/delete", authMiddleware, deleteMultipleRajeshHouse);

// Delete single Rajesh House
router.delete("/:id", authMiddleware, deleteRajeshHouse);

export default router;
