import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema({
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" }
}, { _id: false });

const photoSchema = new mongoose.Schema({
    elevationImages: [String],
    siteImages: [String]
}, { _id: false });

const rajeshHouseSchema = new mongoose.Schema({
    clientId: { type: String, required: true, index: true },
    uniqueId: { type: String, required: true, sparse: true },
    username: { type: String, required: true },
    dateTime: { type: String, required: true },
    day: { type: String, required: true },
    bankName: { type: String, required: true },
    city: { type: String, required: true },
    clientName: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    address: { type: String, required: true },
    payment: { type: String, required: true },
    collectedBy: { type: String, default: "" },
    dsa: { type: String, required: true },
    customDsa: { type: String, default: "" },
    engineerName: { type: String, required: true, default: "" },
    customEngineerName: { type: String, default: "" },
    notes: { type: String, default: "" },
    selectedForm: { type: String, default: null },
    selectedFormName: { type: String, default: null },
    elevation: { type: String, default: "" },
    coordinates: { type: coordinateSchema, default: () => ({}) },
    propertyImages: [mongoose.Schema.Types.Mixed],
    locationImages: [mongoose.Schema.Types.Mixed],
    documentPreviews: [mongoose.Schema.Types.Mixed],
    areaImages: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
    photos: { type: photoSchema, default: () => ({}) },
    bankImage: {
        url: { type: String, default: "" },
        fileName: { type: String, default: "" },
        size: { type: Number, default: 0 },
        path: { type: String, default: "" }
    },
    status: {
        type: String,
        enum: ["pending", "on-progress", "approved", "rejected", "rework"],
        default: "pending"
    },
    managerFeedback: { type: String, default: "" },
    submittedByManager: { type: Boolean, default: false },
    lastUpdatedBy: { type: String, default: "" },
    lastUpdatedByRole: { type: String, default: "" },
    customBankName: { type: String, default: "" },
    customCity: { type: String, default: "" },
    reworkComments: { type: String, default: "" },
    reworkRequestedBy: { type: String, default: "" },
    reworkRequestedAt: { type: Date, default: null },
    reworkRequestedByRole: { type: String, default: "" },
    lastUpdatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    spreadsheetData: {
        rows: [[String]], 
        mergedCells: [{
            row: { type: Number },
            col: { type: Number },
            rowspan: { type: Number },
            colspan: { type: Number }
        }],
        wrapState: [String],
        validationRules: [{
            key: { type: String },
            rule: { type: mongoose.Schema.Types.Mixed }
        }],
        cellStyles: [{
            key: { type: String },
            style: { type: mongoose.Schema.Types.Mixed }
        }],
        lastUpdatedAt: { type: Date, default: null },
        syncedFromForm: { type: Boolean, default: false }
    }

});
rajeshHouseSchema.index({ clientId: 1, uniqueId: 1 }, { unique: true, sparse: true });
rajeshHouseSchema.index({ clientId: 1, username: 1 }); // For user-specific queries
rajeshHouseSchema.index({ clientId: 1, status: 1 }); // For status filtering
rajeshHouseSchema.index({ clientId: 1, createdAt: -1 }); // For sorting by creation date
rajeshHouseSchema.index({ clientId: 1, username: 1, status: 1 }); // For combined filtering
const RajeshHouseModel = mongoose.model("RajeshHouse", rajeshHouseSchema);
export default RajeshHouseModel;