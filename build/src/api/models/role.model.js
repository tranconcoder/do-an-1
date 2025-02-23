"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROLE_COLLECTION_NAME = exports.ROLE_MODEL_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.ROLE_MODEL_NAME = 'Role';
exports.ROLE_COLLECTION_NAME = 'roles';
const roleSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
}, {
    timestamps: {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
});
exports.default = (0, mongoose_1.model)(exports.ROLE_MODEL_NAME, roleSchema, exports.ROLE_COLLECTION_NAME);
