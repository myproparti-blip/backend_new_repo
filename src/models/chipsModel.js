import mongoose from "mongoose";

const chipsSchema = new mongoose.Schema(
  {
    clientId: { type: String, required: true, index: true },
    value: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: String,
    createdAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  { timestamps: true }
);

chipsSchema.index({ clientId: 1, value: 1 }, { unique: true });

export default mongoose.model("Chip", chipsSchema);
