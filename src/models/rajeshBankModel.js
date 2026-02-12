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

const checklistSchema = new mongoose.Schema({
    // Engagement Letter / Confirmation for Assignment
    engagementLetter: { type: String, default: "Yes" },
    engagementLetterReviewed: { type: String, default: "--" },
    
    // Ownership Documents: Sale Deed
    saleDeed: { type: String, default: "Yes" },
    saleDeedReviewed: { type: String, default: "--" },
    
    // Adv. TCR / LSR
    tcrLsr: { type: String, default: "--" },
    tcrLsrReviewed: { type: String, default: "No" },
    
    // Allotment Letter
    allotmentLetter: { type: String, default: "--" },
    allotmentLetterReviewed: { type: String, default: "No" },
    
    // Kabulat Lekh
    kabualatLekh: { type: String, default: "--" },
    kabualatLekhReviewed: { type: String, default: "No" },
    
    // Mortgage Deed
    mortgageDeed: { type: String, default: "--" },
    mortgageDeedReviewed: { type: String, default: "No" },
    
    // Lease Deed
    leaseDeed: { type: String, default: "--" },
    leaseDeadReviewed: { type: String, default: "No" },
    
    // Index – 2
    index2: { type: String, default: "--" },
    index2Reviewed: { type: String, default: "No" },
    
    // VF: 7/12 in case of Land
    vf712: { type: String, default: "--" },
    vf712Reviewed: { type: String, default: "No" },
    
    // NA order
    naOrder: { type: String, default: "--" },
    naOrderReviewed: { type: String, default: "No" },
    
    // Approved Plan
    approvedPlan: { type: String, default: "Yes" },
    approvedPlanReviewed: { type: String, default: "--" },
    
    // Commencement Letter
    commencementLetter: { type: String, default: "--" },
    commencementLetterReviewed: { type: String, default: "No" },
    
    // BU Permission
    buPermission: { type: String, default: "Yes" },
    buPermissionReviewed: { type: String, default: "--" },
    
    // Ele. Meter Photo
    eleMeterPhoto: { type: String, default: "--" },
    eleMeterPhotoReviewed: { type: String, default: "No" },
    
    // Light Bill
    lightBill: { type: String, default: "--" },
    lightBillReviewed: { type: String, default: "No" },
    
    // Muni. Tax Bill
    muniTaxBill: { type: String, default: "Yes" },
    muniTaxBillReviewed: { type: String, default: "--" },
    
    // Numbering – Flat / bungalow / Plot No. / Identification on Site
    numbering: { type: String, default: "Yes" },
    numberingReviewed: { type: String, default: "--" },
    
    // Boundaries of Property – Proper Demarcation
    boundaries: { type: String, default: "Yes" },
    boundariesReviewed: { type: String, default: "--" },
    
    // Merged Property?
    mergedProperty: { type: String, default: "--" },
    mergedPropertyReviewed: { type: String, default: "No" },
    
    // Premise can be Separated, and Entrance / Door is available for the mortgaged property?
    premiseSeparation: { type: String, default: "NA" },
    premiseSeparationReviewed: { type: String, default: "--" },
    
    // Land is Locked?
    landLocked: { type: String, default: "--" },
    landLockedReviewed: { type: String, default: "No" },
    
    // Property is rented to Other Party
    propertyRented: { type: String, default: "--" },
    propertyRentedReviewed: { type: String, default: "No" },
    
    // If Rented – Rent Agreement is Provided?
    rentAgreement: { type: String, default: "--" },
    rentAgreementReviewed: { type: String, default: "No" },
    
    // Site Visit Photos
    siteVisitPhotos: { type: String, default: "Yes" },
    siteVisitPhotosReviewed: { type: String, default: "--" },
    
    // Selfie with Owner / Identifier
    selfieOwner: { type: String, default: "Yes" },
    selfieOwnerReviewed: { type: String, default: "--" },
    
    // Mobile No.
    mobileNo: { type: String, default: "Yes" },
    mobileNoReviewed: { type: String, default: "--" },
    
    // Data Sheet
    dataSheet: { type: String, default: "Yes" },
    dataSheetReviewed: { type: String, default: "--" },
    
    // Tentative Rate
    tentativeRate: { type: String, default: "Yes" },
    tentativeRateReviewed: { type: String, default: "--" },
    
    // Sale Instance / Local Inquiry / Verbal Survey
    saleInstance: { type: String, default: "Yes" },
    saleInstanceReviewed: { type: String, default: "--" },
    
    // Broker Recording
    brokerRecording: { type: String, default: "Yes" },
    brokerRecordingReviewed: { type: String, default: "--" },
    
    // Past Valuation Rate
    pastValuationRate: { type: String, default: "Yes" },
    pastValuationRateReviewed: { type: String, default: "--" }
}, { _id: false });

const pdfDetailsSchema = new mongoose.Schema({
    // PAGE 1: ACCOUNT INFORMATION TABLE
    accountName: { type: String, default: "" },
    nameOfOwner: { type: String, default: "" },
    client: { type: String, default: "" },
    typeOfProperty: { type: String, default: "" },
    propertyDetailsLocation: { type: String, default: "" },
    purposeOfValuation: { type: String, default: "" },
    dateOfValuation: { type: String, default: "" },
    
    // PAGE 2: SUMMARY VALUES TABLE
    applicant: { type: String, default: "" },
    valuationDoneByApproved: { type: String, default: "" },
    nameOfOwnerValuation: { type: String, default: "" },
    addressPropertyValuation: { type: String, default: "" },
    briefDescriptionOfProperty: { type: String, default: "" },
    requisiteDetailsAsPerSaleDeedAuthoritiesDocuments: { type: String, default: "" },
    areaOfLand: { type: String, default: "" },
    areaOfConstruction: { type: String, default: "" },
    valueOfConstruction: { type: String, default: "" },
    
    // PAGE 2: VALUATION SUMMARY VALUES (continued)
    valueOfLand: { type: String, default: "" },
   
    
    // PAGE 3: HEADER SECTION
    branchName: { type: String, default: "" },
    branchAddress: { type: String, default: "" },
    dateOfInspectionOfProperty: { type: String, default: "" },
    dateOfValuationReport: { type: String, default: "" },
    nameOfTheDeputySuperintendentProperty: { type: String, default: "" },
    
    // PAGE 3: PHYSICAL CHARACTERISTICS TABLE
    nearbyLandmark: { type: String, default: "" },
    postalAddress: { type: String, default: "" },
    areaOfThePlotLandSupportedByA: { type: String, default: "" },
    
    // PAGE 4: DETAILED PROPERTY TABLE (IV to XIII)
    developedLand: { type: String, default: "" },
    interceptAccessToTheProperty: { type: String, default: "" },
    locationOfThePropertyWithNeighborhoodLayout: { type: String, default: "" },
    detailsOfExistingProperty: { type: String, default: "" },
    descriptionOfAdjoiningProperty: { type: String, default: "" },
    plotNoRevenueNo: { type: String, default: "" },
    villageOrTalukSubRegisterBlock: { type: String, default: "" },
    subRegistryBlock: { type: String, default: "" },
    district: { type: String, default: "" },
    anyOtherAspect: { type: String, default: "" },
    
    // PAGE 4: PLINTH/CARPET/SALEABLE AREA
    plinthArea: { type: String, default: "" },
  
    
    // PAGE 4: BOUNDARIES OF THE PLOT (Deed/Plan)
    boundaryNorth: { type: String, default: "" },
    boundarySouth: { type: String, default: "" },
    boundaryEast: { type: String, default: "" },
    boundaryWest: { type: String, default: "" },
    
    // PAGE 4: BOUNDARIES OF THE PLOT (ACTUAL ON SITE)
    boundaryActualNorth: { type: String, default: "" },
    boundaryActualSouth: { type: String, default: "" },
    boundaryActualEast: { type: String, default: "" },
    boundaryActualWest: { type: String, default: "" },
    
    // PAGE 5: TOWN PLANNING PARAMETERS
    masterPlanProvisions: { type: String, default: "" },
    propertyInTermsOfLandUseSpace: { type: String, default: "" },
    asPerGDR: { type: String, default: "" },
    certificateHasBeenIssued: { type: String, default: "" },
    constructionMandatorily: { type: String, default: "" },
    permissibleTypeLaws: { type: String, default: "" },
    planningAreaZone: { type: String, default: "" },
    constraintFullyDeveloped: { type: String, default: "" },
    requirementForCommercialArea: { type: String, default: "" },
    surroundingAreaWithCommercialAndResidential: { type: String, default: "" },
    demolitionProceedings: { type: String, default: "" },
    compoundingRegularizationProceedings: { type: String, default: "" },
    townPlanningOtherAspect: { type: String, default: "" },
    
    
    // PAGE 5: CHECKLIST OF DOCUMENTS
    docSaleDeed: { type: String, default: "" },
    docPropertyTax: { type: String, default: "" },
    docPowerOfAttorney: { type: String, default: "" },
    docBuildingPlanApproval: { type: String, default: "" },
    docEncumbranceCertificate: { type: String, default: "" },
    docSurveyReport: { type: String, default: "" },
    docShareCertificate: { type: String, default: "" },
    docAgreementToSell: { type: String, default: "" },
    docOtherDocuments: { type: String, default: "" },
    
    // PAGE 5: DOCUMENT DETAILS & LEGAL ASPECTS
    includesRegistrationOfEachProperty: { type: String, default: "" },
    shareCertificate: { type: String, default: "" },
    approvalPlanAndBUPermission: { type: String, default: "" },
    
    // PAGE 6: AMC & OWNERSHIP
    amcTheBill: { type: String, default: "" },
    certainStatusOfFreeholdOrLeasehold: { type: String, default: "" },
    notificationOfAcquisition: { type: String, default: "" },
    notificationOfRoadWidening: { type: String, default: "" },
    heritageEasement: { type: String, default: "" },
    commentOnTransferability: { type: String, default: "" },
    commentOnExistingMortgages: { type: String, default: "" },
    commentOnGuarantee: { type: String, default: "" },
    ifPropertyIsAgriculturalLand: { type: String, default: "" },
    sarfaesiCompliant: { type: String, default: "" },
    observationOnDisputeOrDues: { type: String, default: "" },
    legalDocumentsEnclosed: { type: String, default: "" },
    whetherEntirePieceLandMortgaged: { type: String, default: "" },
    leaseAgreement: { type: String, default: "" },
    letterAgreement: { type: String, default: "" },
    authorityApprovedPlan: { type: String, default: "" },
    anyViolationFromApprovedPlan: { type: String, default: "" },

    
    // PAGE 7: ECONOMIC ASPECTS TABLE
    reasonableLettingValue: { type: String, default: "" },
    tenancyDetails: { type: String, default: "" },
    taxesAndOutgoings: { type: String, default: "" },
    propertyInsurance: { type: String, default: "" },
    monthlyMaintenanceCharges: { type: String, default: "" },
    securityCharges: { type: String, default: "" },
    economicOtherAspect: { type: String, default: "" },
    
    // PAGE 7: SOCIO-CULTURAL ASPECTS TABLE
    socioCulturalDescription: { type: String, default: "" },
    socialInfrastructureType: { type: String, default: "" },
    
    // PAGE 7: FUNCTIONAL AND UTILITARIAN ASPECTS TABLE
    spaceAllocation: { type: String, default: "" },
    storageSpaces: { type: String, default: "" },
    utilitySpaces: { type: String, default: "" },
    carParkingFacility: { type: String, default: "" },
    balconies: { type: String, default: "" },
    functionalOtherAspect: { type: String, default: "" },
    
    // PAGE 8: INFRASTRUCTURE AVAILABILITY TABLE - AQUA INFRASTRUCTURE
    waterSupply: { type: String, default: "" },
    sewerageSystem: { type: String, default: "" },
    stormWaterDrainage: { type: String, default: "" },
    
    // PAGE 8: INFRASTRUCTURE AVAILABILITY TABLE - PHYSICAL INFRASTRUCTURE
    solidWasteManagement: { type: String, default: "" },
    electricity: { type: String, default: "" },
    roadConnectivity: { type: String, default: "" },
    publicUtilities: { type: String, default: "" },
    
    // PAGE 8: INFRASTRUCTURE AVAILABILITY TABLE - SOCIAL INFRASTRUCTURE
    schoolFacility: { type: String, default: "" },
    medicalFacility: { type: String, default: "" },
    recreationalFacility: { type: String, default: "" },
    
    // PAGE 8: MARKETABILITY OF THE PROPERTY TABLE
    marketabilityLocational: { type: String, default: "" },
    marketabilityScarcity: { type: String, default: "" },
    marketabilityDemandSupply: { type: String, default: "" },
    marketabilityComparablePrices: { type: String, default: "" },
    marketabilityOtherAspect: { type: String, default: "" },
    
   
    
    // PAGE 15: ENCLOSURES (NEW FIELD NAMES)
    enclosureLayoutPlan: { type: String, default: "" },
    enclosureBuildingPlan: { type: String, default: "" },
    enclosureFloorPlan: { type: String, default: "" },
    enclosurePhotograph: { type: String, default: "" },
    enclosureApprovedPlan: { type: String, default: "" },
    enclosureGoogleMap: { type: String, default: "" },
    enclosurePriceTrend: { type: String, default: "" },
    enclosureGuidelineRate: { type: String, default: "" },
    enclosureOtherDocuments: { type: String, default: "" },
    
    // PAGE 9: ENGINEERING AND TECHNOLOGY ASPECTS TABLE
    constructionType: { type: String, default: "" },
    materialTechnology: { type: String, default: "" },
    specifications: { type: String, default: "" },
    maintenanceStatus: { type: String, default: "" },
    buildingAge: { type: String, default: "" },
    totalLife: { type: String, default: "" },
    deterioration: { type: String, default: "" },
    structuralSafety: { type: String, default: "" },
    disasterProtection: { type: String, default: "" },
    visibleDamage: { type: String, default: "" },
    airConditioning: { type: String, default: "" },
    firefighting: { type: String, default: "" },
    buildingPlans: { type: String, default: "" },
    
    // PAGE 9: ENVIRONMENTAL FACTORS TABLE
    greenBuildingTechniques: { type: String, default: "" },
    rainWaterHarvesting: { type: String, default: "" },
    solarSystems: { type: String, default: "" },
    environmentalPollution: { type: String, default: "" },
    
    // PAGE 9: ARCHITECTURAL AND AESTHETIC QUALITY TABLE
    architecturalQuality: { type: String, default: "" },
    
    // PAGE 10: VALUATION METHODOLOGY DATA
    valuationMethodology: { type: String, default: "" },
    marketRatePriceTrend: { type: String, default: "" },
    guidelineRateObtained: { type: String, default: "" },
    valuationSummary: { type: String, default: "" },
    guidelineValue: { type: String, default: "" },
    
    // PAGE 12: MARKET VALUE OF THE PROPERTY - LAND VALUE
    landAreaSqmt: { type: String, default: "" },
    landRatePerSqmtr: { type: String, default: "" },
    valueOfLandMarket: { type: String, default: "" },
    totalLandValue: { type: String, default: "" },
    
    // PAGE 12: BUILDING VALUE
    plinthAreaBuilding: { type: String, default: "" },
    plinthAreaSqft: { type: String, default: "" },
    roofHeightApprox: { type: String, default: "" },
    ageOfBuilding: { type: String, default: "" },
    replacementDepreciation: { type: String, default: "" },
    valueOfConstruction: { type: String, default: "" },
    valueOfConstructionMarket: { type: String, default: "" },
    buildingParticulars: { type: String, default: "" },
    totalBuildingValue: { type: String, default: "" },
    
    // PAGE 12: MARKET VALUE OF PROPERTY SUMMARY
    marketValueOfProperty: { type: String, default: "" },
    realizableValueProperty: { type: String, default: "" },
    distressValueProperty: { type: String, default: "" },
    insurableValueProperty: { type: String, default: "" },
    jantriValueProperty: { type: String, default: "" },
   
    }, { _id: false });
    const customFieldSchema = new mongoose.Schema({
        name: { type: String, required: true },
        value: { type: String, required: true }
    }, { _id: false });


const rajeshBankSchema = new mongoose.Schema({
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
    checklist: { type: checklistSchema, default: () => ({}) },
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
        lastUpdatedAt: { type: Date, default: null },
        syncedFromForm: { type: Boolean, default: false }
    }

});

// Indexes for faster queries
rajeshBankSchema.index({ clientId: 1, uniqueId: 1 }, { unique: true, sparse: true });
rajeshBankSchema.index({ clientId: 1, username: 1 }); // For user-specific queries
rajeshBankSchema.index({ clientId: 1, status: 1 }); // For status filtering
rajeshBankSchema.index({ clientId: 1, createdAt: -1 }); // For sorting by creation date
rajeshBankSchema.index({ clientId: 1, username: 1, status: 1 }); // For combined filtering

const RajeshBankModel = mongoose.model("RajeshBank", rajeshBankSchema);
export default RajeshBankModel;