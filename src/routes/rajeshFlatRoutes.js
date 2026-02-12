import express from "express";
import multer from "multer";
import {
    createRajeshFlat,
    getRajeshFlatById,
    getAllRajeshFlat,
    updateRajeshFlat,
    managerSubmitRajeshFlat,
    requestReworkRajeshFlat,
    deleteRajeshFlat,
    deleteMultipleRajeshFlat,
    getLastSubmittedRajeshFlat
} from "../controllers/rajeshFlatController.js";
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

// Create new Rajesh Flat form
router.post("", authMiddleware, createRajeshFlat);

// Get all Rajesh Flat forms (with role-based filtering)
router.get("", authMiddleware, getAllRajeshFlat);


// Get last submitted form for autofilling
router.get("/last-form/prefill", authMiddleware, getLastSubmittedRajeshFlat);


// Get by ID
router.get("/:id", authMiddleware, getRajeshFlatById);

// Update Rajesh Flat form (only user can update their own pending form)
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
    updateRajeshFlat
);

// Manager/Admin submit action (approve/reject)
router.post("/:id/manager-submit", authMiddleware, isManagerOrAdmin, managerSubmitRajeshFlat);

// Manager/Admin request rework (only for approved items)
router.post("/:id/request-rework", authMiddleware, isManagerOrAdmin, requestReworkRajeshFlat);

// Delete multiple Rajesh Flat (must be before single delete)
router.post("/bulk/delete", authMiddleware, deleteMultipleRajeshFlat);

// Delete single Rajesh Flat
router.delete("/:id", authMiddleware, deleteRajeshFlat);

export default router;
