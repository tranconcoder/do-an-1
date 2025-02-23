"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.USER_COLLECTION_NAME = exports.USER_MODEL_NAME = void 0;
const mongoose_1 = require("mongoose");
const role_model_1 = require("./role.model");
exports.USER_MODEL_NAME = 'User';
exports.USER_COLLECTION_NAME = 'users';
const userSchema = new mongoose_1.Schema({
    phoneNumber: {
        type: String,
        length: 10,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: role_model_1.ROLE_COLLECTION_NAME,
        required: true,
    },
}, {
    timestamps: {
        updatedAt: 'updated_at',
        createdAt: 'created_at',
    },
});
exports.default = (0, mongoose_1.model)(exports.USER_MODEL_NAME, userSchema, exports.USER_COLLECTION_NAME);
