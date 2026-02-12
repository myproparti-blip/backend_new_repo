/**
 * Pagination Helper Utilities
 * Provides reusable pagination functions for consistent data handling across APIs
 */

/**
 * Extract and validate pagination parameters from query
 * @param {Object} query - Query object containing page and limit
 * @returns {Object} Validated pagination params { page, limit, skip }
 */
export const getPaginationParams = (query) => {
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(10000, Math.max(1, parseInt(query.limit) || 5));
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

/**
 * Build standardized pagination response
 * @param {Array} data - Array of records
 * @param {Number} total - Total count of records matching filter
 * @param {Number} page - Current page number
 * @param {Number} limit - Records per page
 * @returns {Object} Pagination object with metadata
 */
export const buildPaginationResponse = (data, total, page, limit) => {
    const pages = Math.ceil(total / limit);
    const hasNextPage = page < pages;
    const hasPrevPage = page > 1;

    return {
        data,
        pagination: {
            total,
            page,
            limit,
            pages,
            hasNextPage,
            hasPrevPage,
            skip: (page - 1) * limit
        }
    };
};

/**
 * Build standardized error pagination response
 * @param {String} message - Error message
 * @param {Number} status - HTTP status code
 * @returns {Object} Error response object
 */
export const buildPaginationError = (message, status = 500) => {
    return {
        success: false,
        message,
        data: [],
        pagination: {
            total: 0,
            page: 1,
            limit: 5,
            pages: 0,
            hasNextPage: false,
            hasPrevPage: false,
            skip: 0
        }
    };
};

/**
 * Validate pagination parameters and return error if invalid
 * @param {Object} query - Query object
 * @returns {Object|null} Error object or null if valid
 */
export const validatePaginationParams = (query) => {
    if (query.page && (isNaN(query.page) || parseInt(query.page) < 1)) {
        return {
            success: false,
            message: "Invalid page number - must be positive integer",
            statusCode: 400
        };
    }

    if (query.limit && (isNaN(query.limit) || parseInt(query.limit) < 1)) {
        return {
            success: false,
            message: "Invalid limit - must be positive integer",
            statusCode: 400
        };
    }

    if (query.limit && parseInt(query.limit) > 10000) {
        return {
            success: false,
            message: "Limit exceeds maximum of 10000 records",
            statusCode: 400
        };
    }

    return null;
};

/**
 * Calculate offset for cursor-based pagination
 * @param {String} cursor - Base64 encoded cursor
 * @param {Number} limit - Records per page
 * @returns {Number} Skip offset
 */
export const decodeCursor = (cursor, limit = 5) => {
    if (!cursor) return 0;
    try {
        const decoded = Buffer.from(cursor, 'base64').toString('utf-8');
        const offset = parseInt(decoded);
        return isNaN(offset) ? 0 : Math.max(0, offset);
    } catch (e) {
        return 0;
    }
};

/**
 * Encode offset for cursor-based pagination
 * @param {Number} offset - Current offset
 * @returns {String} Base64 encoded cursor
 */
export const encodeCursor = (offset) => {
    return Buffer.from(offset.toString()).toString('base64');
};

/**
 * Extract sort parameters from query
 * Supports: sortBy (field name), sortOrder (-1 for desc, 1 for asc)
 * @param {Object} query - Query object
 * @param {String} defaultField - Default field to sort by
 * @returns {Object} Sort object for MongoDB
 */
export const getSortParams = (query, defaultField = 'createdAt') => {
    const sortBy = query.sortBy || defaultField;
    const sortOrder = parseInt(query.sortOrder) || -1;

    // Whitelist allowed sort fields to prevent injection
    const allowedFields = ['createdAt', 'updatedAt', 'username', 'status', 'city'];
    const field = allowedFields.includes(sortBy) ? sortBy : defaultField;

    return { [field]: sortOrder };
};

/**
 * Middleware for validating pagination parameters
 * @returns {Function} Express middleware
 */
export const paginationMiddleware = (req, res, next) => {
    const error = validatePaginationParams(req.query);
    if (error) {
        return res.status(error.statusCode).json(error);
    }
    next();
};

export default {
    getPaginationParams,
    buildPaginationResponse,
    buildPaginationError,
    validatePaginationParams,
    decodeCursor,
    encodeCursor,
    getSortParams,
    paginationMiddleware
};
