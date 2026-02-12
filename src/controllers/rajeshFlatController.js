import RajeshFlatModel from "../models/rajeshFlatModel.js";
import { getPaginationParams, buildPaginationResponse, getSortParams } from "../utils/paginationHelper.js";

export const createRajeshFlat = async (req, res) => {
    try {
        const { clientId, uniqueId, username, userRole } = req.body;

        // Validate required fields
        if (!clientId || !uniqueId || !username) {
            console.error("[createRajeshFlat] Missing required fields");
            return res.status(400).json({
                success: false,
                message: "Missing required fields: clientId, uniqueId, username"
            });
        }

        // Check for duplicate
        const existingForm = await RajeshFlatModel.findOne({
            clientId,
            uniqueId
        });

        if (existingForm) {
            return res.status(200).json({
                success: true,
                message: "Rajesh Flat form already exists (duplicate submission prevented)",
                data: existingForm,
                isDuplicate: true
            });
        }

        const newForm = new RajeshFlatModel({
            clientId,
            uniqueId,
            username,
            lastUpdatedBy: username,
            lastUpdatedByRole: userRole || "user",
            status: "pending",
            dateTime: new Date().toLocaleString(),
            day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
            ...req.body
        });

        const savedForm = await newForm.save();

        res.status(201).json({
            success: true,
            message: "Rajesh Flat form created successfully",
            data: savedForm
        });
    } catch (error) {
        console.error("[createRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to create Rajesh Flat form",
            error: error.message
        });
    }
};

export const getRajeshFlatById = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        // Validate ID format
        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        let form;
        try {
            form = await RajeshFlatModel.findById(id).lean();
        } catch (idError) {
            // Not a valid ObjectId, try uniqueId
            form = null;
        }

        if (!form) {
            form = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
        }

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Rajesh Flat form not found"
            });
        }

        // CLIENT ISOLATION
        if (form.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        // Permission check
        if (userRole !== "manager" && userRole !== "admin" && form.username !== username) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized access to this form"
            });
        }

        res.status(200).json({
            success: true,
            data: form
        });
    } catch (error) {
        console.error("[getRajeshFlatById] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Rajesh Flat form",
            error: error.message
        });
    }
};

export const getAllRajeshFlat = async (req, res) => {
    try {
        const { username, userRole, clientId, status, city, bankName } = req.query;

        // Validate required parameters
        if (!clientId) {
            console.error("[getAllRajeshFlat] Missing clientId");
            return res.status(400).json({
                success: false,
                message: "Missing clientId - Client identification required"
            });
        }

        // Regular users must provide their username
        if (userRole !== "manager" && userRole !== "admin" && !username) {
            return res.status(400).json({
                success: false,
                message: "Missing username parameter"
            });
        }

        // Extract pagination parameters (default 10 records per page, max 100)
        const { page, limit, skip } = getPaginationParams(req.query);

        // Build filter
        const filter = { clientId };

        // Users only see their own forms; managers and admins see all forms for their client
        if (userRole !== "manager" && userRole !== "admin") {
            filter.username = username;
        }

        // Apply optional filters
        if (status) filter.status = status;
        if (city) filter.city = city;
        if (bankName) filter.bankName = bankName;

        // Get sort parameters (default: createdAt descending)
        const sortParams = getSortParams(req.query, 'createdAt');

        // Define fields to return (optimized for dashboard list)
        const selectFields = [
            'clientId', 'uniqueId', 'username', 'dateTime', 'day',
            'bankName', 'city', 'clientName', 'mobileNumber', 'address',
            'payment', 'collectedBy', 'dsa', 'engineerName', 'notes',
            'selectedForm', 'status', 'managerFeedback', 'submittedByManager',
            'lastUpdatedBy', 'lastUpdatedByRole', 'lastUpdatedAt', 'createdAt',
            'updatedAt', '_id', 'formType'
        ];

        // Fetch forms with pagination
        const forms = await RajeshFlatModel.find(filter)
            .select(selectFields.join(' '))
            .skip(skip)
            .limit(limit)
            .sort(sortParams)
            .lean();

        // Count total matching documents
        const total = await RajeshFlatModel.countDocuments(filter);

        // Build standardized pagination response with enforced limit
        const response = buildPaginationResponse(forms, total, page, limit);

        res.status(200).json({
            success: true,
            ...response
        });
    } catch (error) {
        console.error("[getAllRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch Rajesh Flat forms",
            error: error.message
        });
    }
};

export const updateRajeshFlat = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, userRole, clientId } = req.query;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        if (!username || !userRole || !clientId) {
            return res.status(400).json({
                success: false,
                message: "Missing required user information"
            });
        }

        let form;
        try {
            form = await RajeshFlatModel.findById(id).lean();
        } catch (idError) {
            form = null;
        }

        if (!form) {
            form = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
        }

        if (!form) {
            try {
                const newForm = new RajeshFlatModel({
                    clientId,
                    uniqueId: String(id),
                    username,
                    lastUpdatedBy: username,
                    lastUpdatedByRole: userRole,
                    status: "pending",
                    dateTime: new Date().toLocaleString(),
                    day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
                    ...req.body
                });
                form = await newForm.save();
            } catch (createError) {
                console.error("[updateRajeshFlat] Failed to create form:", createError.message);
                if (createError.code === 11000) {
                    form = await RajeshFlatModel.findOne({ clientId, uniqueId: String(id) }).lean();
                    if (!form) {
                        return res.status(400).json({
                            success: false,
                            message: "Duplicate form entry - unable to create or update"
                        });
                    }
                } else {
                    return res.status(400).json({
                        success: false,
                        message: "Failed to create form: " + createError.message
                    });
                }
            }
        }

        if (form.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        if (userRole !== "manager" && userRole !== "admin" && form.username !== username) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this form"
            });
        }

        if (userRole !== "manager" && userRole !== "admin") {
            if (!["pending", "rejected", "rework"].includes(form.status)) {
                return res.status(400).json({
                    success: false,
                    message: `Cannot edit form with status: ${form.status}`
                });
            }
        }

        const updateData = {
            ...req.body,
            status: "on-progress",
            lastUpdatedBy: username,
            lastUpdatedByRole: userRole,
            lastUpdatedAt: new Date(),
            updatedAt: new Date()
        };

        if (userRole !== "admin") {
            delete updateData.managerFeedback;
            delete updateData.submittedByManager;
        }

        const updatedForm = await RajeshFlatModel.findByIdAndUpdate(
            form._id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        if (!updatedForm) {
            console.error("[updateRajeshFlat] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update Rajesh Flat form"
            });
        }

        res.status(200).json({
            success: true,
            message: "Rajesh Flat form updated successfully",
            data: updatedForm
        });
    } catch (error) {
        console.error("[updateRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update Rajesh Flat form",
            error: error.message
        });
    }
};

export const managerSubmitRajeshFlat = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const action = req.body.action || req.body.status;
        const feedback = req.body.feedback || req.body.managerFeedback || "";
        const username = req.body.username || req.user.username;
        const userRole = req.body.userRole || req.user.role;
        const clientId = req.body.clientId || req.user.clientId;

        if (req.user.role !== "manager" && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can perform this action"
            });
        }

        if (!["approved", "rejected"].includes(action)) {
            return res.status(400).json({
                success: false,
                message: "Invalid action. Must be 'approved' or 'rejected'"
            });
        }

        let form;
        try {
            form = await RajeshFlatModel.findById(id).lean();
        } catch (idError) {
            form = null;
        }

        if (!form) {
            form = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
        }

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Rajesh Flat form not found"
            });
        }

        if (form.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        const updatedForm = await RajeshFlatModel.findByIdAndUpdate(
            form._id,
            {
                status: action,
                managerFeedback: feedback ? feedback.trim() : "",
                submittedByManager: true,
                lastUpdatedBy: username,
                lastUpdatedByRole: userRole,
                lastUpdatedAt: new Date()
            },
            { new: true }
        );

        if (!updatedForm) {
            console.error("[managerSubmitRajeshFlat] Failed to update form:", id);
            return res.status(500).json({
                success: false,
                message: "Failed to update Rajesh Flat form"
            });
        }

        res.status(200).json({
            success: true,
            message: `Rajesh Flat form ${action} successfully`,
            data: updatedForm
        });
    } catch (error) {
        console.error("[managerSubmitRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to submit Rajesh Flat form",
            error: error.message
        });
    }
};

export const requestReworkRajeshFlat = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || typeof id !== 'string') {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format"
            });
        }

        const comments = req.body.comments || "";
        const username = req.body.username || req.user.username;
        const userRole = req.body.userRole || req.user.role;
        const clientId = req.body.clientId || req.user.clientId;

        if (req.user.role !== "manager" && req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only managers and admins can request rework"
            });
        }

        let form;
        try {
            form = await RajeshFlatModel.findById(id).lean();
        } catch (idError) {
            form = null;
        }

        if (!form) {
            form = await RajeshFlatModel.findOne({ uniqueId: String(id) }).lean();
        }

        if (!form) {
            return res.status(404).json({
                success: false,
                message: "Rajesh Flat form not found"
            });
        }

        if (form.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        const updateData = {
            status: "rework",
            reworkComments: comments || "",
            reworkRequestedBy: username,
            reworkRequestedAt: new Date(),
            reworkRequestedByRole: userRole,
            lastUpdatedBy: username,
            lastUpdatedByRole: userRole,
            lastUpdatedAt: new Date()
        };

        let updatedForm;
        try {
            updatedForm = await RajeshFlatModel.findByIdAndUpdate(id, updateData, { new: true });
        } catch (idError) {
            updatedForm = null;
        }

        if (!updatedForm) {
            updatedForm = await RajeshFlatModel.findOneAndUpdate(
                { uniqueId: String(id) },
                updateData,
                { new: true }
            );
        }

        res.status(200).json({
            success: true,
            message: "Rework requested successfully",
            data: updatedForm
        });
    } catch (error) {
        console.error("[requestReworkRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to request rework",
            error: error.message
        });
    }
};

export const deleteRajeshFlat = async (req, res) => {
    try {
        const { id } = req.params;
        const clientId = req.user?.clientId;

        if (!clientId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Missing client information"
            });
        }

        let deletedForm;
        try {
            deletedForm = await RajeshFlatModel.findByIdAndDelete(id);
        } catch (idError) {
            deletedForm = null;
        }

        if (!deletedForm) {
            deletedForm = await RajeshFlatModel.findOneAndDelete({ uniqueId: String(id) });
        }

        if (!deletedForm) {
            return res.status(404).json({
                success: false,
                message: "Rajesh Flat form not found"
            });
        }

        if (deletedForm.clientId !== clientId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized - Record belongs to different client"
            });
        }

        res.status(200).json({
            success: true,
            message: "Rajesh Flat form deleted successfully",
            data: deletedForm
        });
    } catch (error) {
        console.error("[deleteRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Rajesh Flat form",
            error: error.message
        });
    }
};

export const deleteMultipleRajeshFlat = async (req, res) => {
    try {
        const { ids } = req.body;
        const clientId = req.user?.clientId;

        if (!Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Invalid request - ids must be a non-empty array"
            });
        }

        if (!clientId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - Missing client information"
            });
        }

        const result = await RajeshFlatModel.deleteMany({
            $or: [
                { _id: { $in: ids } },
                { uniqueId: { $in: ids.map(String) } }
            ],
            clientId: clientId
        });

        res.status(200).json({
            success: true,
            message: `Deleted ${result.deletedCount} Rajesh Flat record(s)`,
            deletedCount: result.deletedCount
        });
    } catch (error) {
        console.error("[deleteMultipleRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to delete Rajesh Flat forms",
            error: error.message
        });
    }
};
export const getLastSubmittedRajeshFlat = async (req, res) => {
    try {
        const { username, clientId } = req.query;

        if (!username || !clientId) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters: username and clientId"
            });
        }

        const lastForm = await RajeshFlatModel.findOne({
            username,
            clientId
        })
            .sort({ createdAt: -1 })
            .lean();

        if (!lastForm) {
            return res.status(404).json({
                success: false,
                message: "No previous form found for autofill"
            });
        }

        res.status(200).json({
            success: true,
            data: lastForm
        });
    } catch (error) {
        console.error("[getLastSubmittedRajeshFlat] Error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch last submitted form",
            error: error.message
        });
    }
};