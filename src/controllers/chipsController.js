import Chip from "../models/chipsModel.js";
import { clientUsers } from "../models/clientUsersModel.js";

// Get all chips for a client
export const getChips = async (req, res) => {
  try {
    const { clientId: queryClientId } = req.query;
    const requestUser = req.user;

    console.log("[getChips] Request from user:", requestUser.username, "Role:", requestUser.role);
    console.log("[getChips] User clientId:", requestUser.clientId);
    console.log("[getChips] Query clientId:", queryClientId);

    // Determine which clientId to use
    let clientId;
    
    if (requestUser.role === "masteradmin") {
      // Masteradmin can query any client's chips
      clientId = queryClientId || requestUser.clientId;
      console.log("[getChips] Masteradmin - accessing clientId:", clientId);
    } else {
      // Regular users can only access their own client's chips
      // Ignore queryClientId parameter for non-masteradmin users
      clientId = requestUser.clientId;
      console.log("[getChips] Regular user - accessing own clientId:", clientId);
    }

    if (!clientId) {
      console.log("[getChips] No clientId available");
      return res.status(400).json({
        success: false,
        message: "clientId is required",
      });
    }

    const chips = await Chip.find({ clientId })
      .sort({ createdAt: -1 })
      .lean();

    console.log("[getChips] Found", chips.length, "chips for clientId:", clientId);

    res.status(200).json({
      success: true,
      data: chips,
    });
  } catch (err) {
    console.error("[getChips] Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Error fetching chips",
      error: err.message,
    });
  }
};

// Add a new chip
export const addChip = async (req, res) => {
  try {
    const { clientId, value } = req.body;
    const requestUser = req.user;

    console.log("[addChip] Adding chip from user:", requestUser.username, "Role:", requestUser.role);
    console.log("[addChip] Chip data - clientId:", clientId, "value:", value);

    // Only masteradmin can add chips
    if (requestUser.role !== "masteradmin") {
      console.log("[addChip] Access denied - user is not masteradmin");
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only master admin can add chips",
      });
    }

    // Validate inputs
    if (!clientId) {
      console.log("[addChip] Missing clientId");
      return res.status(400).json({
        success: false,
        message: "clientId is required",
      });
    }

    if (!value || typeof value !== "string" || !value.trim()) {
      console.log("[addChip] Invalid value");
      return res.status(400).json({
        success: false,
        message: "Value is required and must be a non-empty string",
      });
    }

    // Check if chip already exists
    const existing = await Chip.findOne({
      clientId,
      value: value.trim(),
    });

    if (existing) {
      console.log("[addChip] Chip already exists");
      return res.status(200).json({
        success: true,
        message: "Chip already exists",
        data: existing,
      });
    }

    // Create new chip
    const newChip = await Chip.create({
      clientId,
      value: value.trim(),
      createdBy: requestUser.username,
    });

    console.log("[addChip] Chip created successfully:", newChip._id, "for client:", clientId);

    res.status(201).json({
      success: true,
      message: "Chip added successfully",
      data: newChip,
    });
  } catch (err) {
    console.error("[addChip] Error:", err.message);
    // Handle duplicate key error
    if (err.code === 11000) {
      return res.status(200).json({
        success: true,
        message: "Chip already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error adding chip",
      error: err.message,
    });
  }
};

// Delete a chip
export const deleteChip = async (req, res) => {
  try {
    const { id } = req.params;
    const requestUser = req.user;

    // Only masteradmin can delete chips
    if (requestUser.role !== "masteradmin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only master admin can delete chips",
      });
    }

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Chip ID is required",
      });
    }

    // Delete the chip
    const result = await Chip.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Chip not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chip deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error deleting chip",
      error: err.message,
    });
  }
};

// Get all clients (masteradmin only)
export const getAllClients = async (req, res) => {
  try {
    const requestUser = req.user;

    // Only masteradmin can access all clients
    if (requestUser.role !== "masteradmin") {
      return res.status(403).json({
        success: false,
        message: "Unauthorized: Only master admin can view all clients",
      });
    }

    // Get all client IDs from clientUsers
    const clientIds = Object.keys(clientUsers);

    res.status(200).json({
      success: true,
      data: clientIds,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching clients",
      error: err.message,
    });
  }
};
