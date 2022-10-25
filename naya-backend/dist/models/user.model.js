"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const UserSchema = new mongoose_1.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error('Invalid email');
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error('Password must contain at least one letter and one number');
            }
        },
    },
    sketches: {
        type: [mongoose_1.default.Types.ObjectId],
        default: [],
    },
    color: {
        type: String,
    },
    dp: {
        url: { type: String },
        id: { type: String },
    },
}, {
    timestamps: true,
});
UserSchema.methods.checkPassword = async function (password) {
    const result = await bcryptjs_1.default.compare(password, this.password);
    return result;
};
UserSchema.methods.generateJWT = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
    }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};
UserSchema.methods.toAuthJSON = function () {
    const { firstName, lastName, email, sketches } = this;
    return {
        firstName,
        lastName,
        email,
        sketches,
        token: this.generateJWT(),
    };
};
UserSchema.statics.findByEmail = function (email) {
    return this.findOne({ email });
};
UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcryptjs_1.default.hash(user.password, 8);
    }
    next();
});
const UserModel = mongoose_1.default.model('User', UserSchema);
exports.default = UserModel;
