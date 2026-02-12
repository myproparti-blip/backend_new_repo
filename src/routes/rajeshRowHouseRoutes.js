import express from "express";
import multer from "multer";
import {
    createRajeshRowHouse,
    getRajeshRowHouseById,
    getAllRajeshRowHouse,
    updateRajeshRowHouse,
    managerSubmitRajeshRowHouse,
    requestReworkRajeshRowHouse,
    deleteRajeshRowHouse,
    deleteMultipleRajeshRowHouse,
    getLastSubmittedRajeshRowHouse
} from "../controllers/rajeshRowHouseController.js";
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

// Create new Rajesh RowHouse form
router.post("", authMiddleware, createRajeshRowHouse);

// Get all Rajesh RowHouse forms (with role-based filtering)
router.get("", authMiddleware, getAllRajeshRowHouse);

// Get last submitted form for autofilling
router.get("/last-form/prefill", authMiddleware, getLastSubmittedRajeshRowHouse);
// Get by ID
router.get("/:id", authMiddleware, getRajeshRowHouseById);

// Update Rajesh RowHouse form (only user can update their own pending form)
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
    updateRajeshRowHouse
);

// Manager/Admin submit action (approve/reject)
router.post("/:id/manager-submit", authMiddleware, isManagerOrAdmin, managerSubmitRajeshRowHouse);

// Manager/Admin request rework (only for approved items)
router.post("/:id/request-rework", authMiddleware, isManagerOrAdmin, requestReworkRajeshRowHouse);

// Delete multiple Rajesh RowHouse (must be before single delete)
router.post("/bulk/delete", authMiddleware, deleteMultipleRajeshRowHouse);

// Delete single Rajesh RowHouse
router.delete("/:id", authMiddleware, deleteRajeshRowHouse);

export default router;
