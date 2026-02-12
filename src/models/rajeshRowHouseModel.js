import mongoose from "mongoose";

const coordinateSchema = new mongoose.Schema({
    latitude: { type: String, default: "" },
    longitude: { type: String, default: "" }
}, { _id: false });

const photoSchema = new mongoose.Schema({
    elevationImages: [String],
    siteImages: [String]
}, { _id: false });

const customAreaSchema = new mongoose.Schema({
    areaName: { type: String, required: true },
    customName: { type: String, default: "" }
}, { _id: false });

const pdfDetailsSchema = new mongoose.Schema({
    // GENERAL TAB FIELDS
    numberingFlatBungalowPlotNo: { type: String, default: "" },
    applicant: { type: String, default: "" },
    nameOfOwnerOrOwners: { type: String, default: "" },
    ownerNameAddress: { type: String, default: "" },
    typeOfProperty: { type: String, default: "" },
    typeOfStructure: { type: String, default: "" },
    statusOfTenure: { type: String, default: "" },
    accountName: { type: String, default: "" },
    client: { type: String, default: "" },
    contactNumberOfRepresentative: { type: String, default: "" },
    nearbyLandmarkGoogleMap: { type: String, default: "" },
    matchingOfBoundaries: { type: String, default: "" },
    addressOfPropertyUnderValuation: { type: String, default: "" },
    adjoiningPropertiesNorthDocument: { type: String, default: "" },
    adjoiningPropertiesNorthSite: { type: String, default: "" },
    adjoiningPropertiesSouthDocument: { type: String, default: "" },
    adjoiningPropertiesSouthSite: { type: String, default: "" },
    adjoiningPropertiesEastDocument: { type: String, default: "" },
    adjoiningPropertiesEastSite: { type: String, default: "" },
    adjoiningPropertiesWestDocument: { type: String, default: "" },
    adjoiningPropertiesWestSite: { type: String, default: "" },
    plotDemarcated: { type: String, default: "" },
    dateOfInspectionOfProperty: { type: String, default: "" },
    briefDescriptionOfProperty: { type: String, default: "" },
    ageOfPropertyInYears: { type: String, default: "" },
    stageOfConstruction: { type: String, default: "" },
    violationsIfAnyObserved: { type: String, default: "" },
    approvedLandUse: { type: String, default: "" },
    noOfYearsOfOccupancySince: { type: String, default: "" },
    relationshipOfTenantOrOwner: { type: String, default: "" },
    natureAndExtentOfViolations: { type: String, default: "" },
    propertyDetails: { type: String, default: "" },
    remarks: { type: String, default: "" },

    // VALUATION TAB FIELDS
    purposeOfProperty: { type: String, default: "" },
    valuationDoneByGovtApprovedValuer: { type: String, default: "" },
    dateOfValuation: { type: String, default: "" },
    dateOfValuationReport: { type: String, default: "" },
    areaOfLand: { type: String, default: "" },
    areaOfConstruction: { type: String, default: "" },
    revenueDetailsPerSaleDeed: { type: String, default: "" },
    landAreaAsPerSaleDeed: { type: String, default: "" },
    landAreaAsPerGRUDA: { type: String, default: "" },
    builtUpAreaAsPerGRUDA: { type: String, default: "" },
    cabuaSbuaInSqFt: { type: String, default: "" },
    yearOfConstruction: { type: String, default: "" },
    totalLifeOfPropertyInYears: { type: String, default: "" },
    ifUnderConstructionExtentOfCompletion: { type: String, default: "" },
    residualAgeOfPropertyInYears: { type: String, default: "" },
    totalNoOfFloor: { type: String, default: "" },
    floorOnWhichPropertyIsLocated: { type: String, default: "" },
    noOfRoomsLivingDining: { type: String, default: "" },
    bedRooms: { type: String, default: "" },
    noOfRoomsToiletBath: { type: String, default: "" },
    kitchenStore: { type: String, default: "" },
    location: { type: String, default: "" },
    valueOfLand: { type: String, default: "" },
    valueOfConstruction: { type: String, default: "" },
    totalMarketValueOfProperty: { type: String, default: "" },
    realizableValue: { type: String, default: "" },
    distressValue: { type: String, default: "" },
    insurableValue: { type: String, default: "" },
    jantriValueOfProperty: { type: String, default: "" },
    bookValueOfProperty: { type: String, default: "" },
    guidelineRateObtainedFrom: { type: String, default: "" },
    guidelineValue: { type: String, default: "" },
    marketValueOfProperty: { type: String, default: "" },
    saleDeed: { type: String, default: "" },
    grudaImpactPlan: { type: String, default: "" },
    layoutPlan: { type: String, default: "" },
    constructionPermission: { type: String, default: "" },
    lightBill: { type: String, default: "" },
    taxBill: { type: String, default: "" },

    // VALUATION ANALYSIS TAB FIELDS
    landAreaSFT: { type: String, default: "" },
    landRatePerSqFt: { type: String, default: "" },
    valueOfLand: { type: String, default: "" },
    estimatedReplacementRate: { type: String, default: "" },
    valueOfConstruction: { type: String, default: "" },
    buildingValuePlinthArea: { type: String, default: "" },
    buildingValueRoofHeight: { type: String, default: "" },
    buildingValueAge: { type: String, default: "" },

    // CHECKLIST FIELDS (Yes/No dropdowns)
    checklist_engagementLetterConfirmation: { type: String, default: "" },
    checklist_ownershipDocumentsSaleDeed: { type: String, default: "" },
    checklist_advTcrLsr: { type: String, default: "" },
    checklist_allotmentLetter: { type: String, default: "" },
    checklist_kabulatLekh: { type: String, default: "" },
    checklist_mortgageDeed: { type: String, default: "" },
    checklist_leaseDeed: { type: String, default: "" },
    checklist_index2: { type: String, default: "" },
    checklist_vf712InCaseOfLand: { type: String, default: "" },
    checklist_naOrder: { type: String, default: "" },
    checklist_approvedPlan: { type: String, default: "" },
    checklist_commencementLetter: { type: String, default: "" },
    checklist_buPermission: { type: String, default: "" },
    checklist_eleMeterPhoto: { type: String, default: "" },
    checklist_lightBill: { type: String, default: "" },
    checklist_muniTaxBill: { type: String, default: "" },
    checklist_numberingFlatPlotNoIdentification: { type: String, default: "" },
    checklist_boundariesPropertyDemarcation: { type: String, default: "" },
    checklist_mergedProperty: { type: String, default: "" },
    checklist_premiseCanBeSeparatedEntrance: { type: String, default: "" },
    checklist_landIsLocked: { type: String, default: "" },
    checklist_propertyIsRentedToOtherParty: { type: String, default: "" },
    checklist_ifRentedRentAgreementProvided: { type: String, default: "" },
    checklist_siteVisitPhotos: { type: String, default: "" },
    checklist_selfieWithOwnerIdentifier: { type: String, default: "" },
    checklist_mobileNo: { type: String, default: "" },
    checklist_dataSheet: { type: String, default: "" },
    checklist_tentativeRate: { type: String, default: "" },
    checklist_saleInstanceLocalInquiry: { type: String, default: "" },
    checklist_brokerRecording: { type: String, default: "" },
    checklist_pastValuationRate: { type: String, default: "" },

    // ASSUMPTIONS & REMARKS
    qualificationsInTIR: { type: String, default: "" },
    propertyIsSARFAESICompliant: { type: String, default: "" },
    propertyBelongsToSocialInfrastructure: { type: String, default: "" },
    entireLandMortgaged: { type: String, default: "" },
    anyOtherAspectOnMarketability: { type: String, default: "" },

    // ENCLOSURES
    layoutPlanSketch: { type: String, default: "" },
    buildingPlan: { type: String, default: "" },
    floorPlan: { type: String, default: "" },
    photographsOfProperty: { type: String, default: "" },
    certifiedCopyOfApprovedPlan: { type: String, default: "" },
    googleMapLocation: { type: String, default: "" },
    priceTrendFromPropertySites: { type: String, default: "" },
    anyOtherRelevantDocuments: { type: String, default: "" },
    
    // DYNAMIC DECLARATION TABLE FIELDS
    backgroundInfoComment: { type: String, default: "Referred provided documents" },
    valuationPurposeComment: { type: String, default: "Continue Financial Assistance Purpose" },
    valuersIdentityComment: { type: String, default: "Self-assessment" },
    conflictOfInterestComment: { type: String, default: "N.A." },
    inspectionsUndertakenComment: { type: String, default: "Yes." },
    informationSourcesComment: { type: String, default: "Local inquiries, brokers, known websites, i.e., matches, 99acre, propertiwalai, proptiger, housing, etc., if available" },
    valuationProceduresComment: { type: String, default: "Land & Building Method, with Market Approach for Land and Cost Approach for Building." },
    restrictionsOnUseComment: { type: String, default: "As per purpose mentioned in report." },
    majorFactorsComment: { type: String, default: "Location of the property, with developing of surroundings, for going-purpose valuation" },
    notConsideredFactorsComment: { type: String, default: "Future market events and Government Policies." },
    caveatsLimitationsComment: { type: String, default: "We are not responsible for Title of the subjected property and valuations affected by the same" },
   
}, { _id: false });
const customFieldSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: String, required: true }
}, { _id: false });
const rajeshRowHouseSchema = new mongoose.Schema({
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
    elevation: { type: String, default: "" },
    coordinates: { type: coordinateSchema, default: () => ({}) },
    propertyImages: [mongoose.Schema.Types.Mixed],
    locationImages: [mongoose.Schema.Types.Mixed],
     bankImage: { type: mongoose.Schema.Types.Mixed, default: null },
     documentPreviews: [mongoose.Schema.Types.Mixed],
     areaImages: { type: mongoose.Schema.Types.Mixed, default: () => ({}) },
     customAreas: [{ type: customAreaSchema, default: () => ({}) }],
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
    pdfDetails: { type: pdfDetailsSchema, default: () => ({}) },
    customBankName: { type: String, default: "" },
    customCity: { type: String, default: "" },
    reworkComments: { type: String, default: "" },
    reworkRequestedBy: { type: String, default: "" },
    reworkRequestedAt: { type: Date, default: null },
    reworkRequestedByRole: { type: String, default: "" },
    lastUpdatedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
 customFields: [{ type: customFieldSchema, default: () => ({}) }],
    spreadsheetData: {
        rows: [[String]], 
        mergedCells: [{
            row: { type: Number },
            col: { type: Number },
            rowspan: { type: Number },
            colspan: { type: Number }
        }],
        wrapState: [String],
        lastUpdatedAt: { type: Date, default: null },
        syncedFromForm: { type: Boolean, default: false }
    }

});

rajeshRowHouseSchema.index({ clientId: 1, uniqueId: 1 }, { unique: true, sparse: true });

// Indexes for faster queries
rajeshRowHouseSchema.index({ clientId: 1, username: 1 }); // For user-specific queries
rajeshRowHouseSchema.index({ clientId: 1, status: 1 }); // For status filtering
rajeshRowHouseSchema.index({ clientId: 1, createdAt: -1 }); // For sorting by creation date
rajeshRowHouseSchema.index({ clientId: 1, username: 1, status: 1 }); // For combined filtering

const RajeshRowHouseModel = mongoose.model("RajeshRowHouse", rajeshRowHouseSchema);
export default RajeshRowHouseModel;