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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const express_1 = __importDefault(require("express"));
const loginHandler_1 = require("./loginHandler");
const httpStatus_1 = require("../../enum/httpStatus");
const z = __importStar(require("zod"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const registrationHandler_1 = require("./registrationHandler");
const getUserRole_1 = require("./getUserRole");
dotenv_1.default.config();
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *       properties:
 *         userName:
 *           type: string
 *           format: email
 *           description: User email address
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         userName: user@example.com
 *         password: password123
 *     UserRegister:
 *       type: object
 *       required:
 *         - userName
 *         - password
 *         - age
 *         - phone
 *       properties:
 *         userName:
 *           type: string
 *           format: email
 *           description: User email address
 *         password:
 *           type: string
 *           description: User password
 *         age:
 *           type: integer
 *           description: User age
 *         phone:
 *           type: string
 *           description: User phone number
 *       example:
 *         userName: user@example.com
 *         password: password123
 *         age: 30
 *         phone: "123-456-7890"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         token:
 *           type: string
 *       example:
 *         message: User logged in successfully
 *         token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: User Registered in successfully
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: Bad Request
 */
const User = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
});
const UserRegister = z.object({
    userName: z.email().max(30),
    password: z.string().min(4).max(20),
    age: z.number(),
    phone: z.string(),
});
const fp = z
    .object({
    userName: z.email().max(30),
})
    .strict();
exports.users = [
    { userName: "admin@gmail.com", password: "admin" },
];
const mappingSchemaValidation = {
    login: User,
    register: UserRegister,
    "forgat-password": fp,
};
function authInputValidation(req, res, next) {
    const url = req.url.replace("/", "");
    const currentSchema = mappingSchemaValidation[url];
    const validation = currentSchema.safeParse(req.body);
    if (!validation.success) {
        console.log(validation.error);
        throw new Error(httpStatus_1.ERRORS.BAD_REQUEST);
    }
    else {
        next();
    }
}
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login to the application
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 *         headers:
 *           Authorization:
 *             schema:
 *               type: string
 *             description: JWT token
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/login", authInputValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { userName, password } = req.body;
        const foundUser = yield (0, loginHandler_1.login)({ userName, password });
        if (foundUser) {
            const roleResult = yield (0, getUserRole_1.getUserRole)(foundUser.id);
            const token = jsonwebtoken_1.default.sign({
                userName: foundUser.userName,
                isAdmin: ((_a = roleResult === null || roleResult === void 0 ? void 0 : roleResult.role) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "admin",
                role: roleResult === null || roleResult === void 0 ? void 0 : roleResult.role,
                userId: foundUser.id,
            }, process.env.SECRET || "secret", { expiresIn: "5h" });
            return res
                .setHeader("Authorization", token)
                .json({ message: "User logged in successfully", token });
        }
        else
            throw new Error(httpStatus_1.ERRORS.UNAUTH);
    }
    catch (error) {
        console.log(error);
        return next(new Error(error.message));
    }
}));
/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *       200:
 *         description: Registration successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RegisterResponse'
 *       400:
 *         description: Bad Request or User already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/register", authInputValidation, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password, phone, age } = req.body;
        const result = yield (0, registrationHandler_1.register)({ userName, password, phone, age });
        if (result) {
            return res.json({ message: "User Registered in successfully" });
        }
        else
            throw new Error("user already exist");
    }
    catch (error) {
        console.log(error.message);
        return next(new Error(error.message));
    }
}));
/**
 * @swagger
 * /auth/forgat-password:
 *   post:
 *     summary: Reset user password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userName
 *             properties:
 *               userName:
 *                 type: string
 *                 format: email
 *             example:
 *               userName: user@example.com
 *     responses:
 *       200:
 *         description: Password reset initiated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: password reset!
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post("/forgat-password", authInputValidation, (req, res, next) => {
    try {
        const { userName } = req.body;
        if (userName)
            return res.json({ message: "password reset!" });
        else
            throw new Error(httpStatus_1.ERRORS.UNAUTH);
    }
    catch (error) {
        console.log(error);
        return next(new Error(error.message));
    }
});
/**
 * @swagger
 * /auth/clean:
 *   delete:
 *     summary: Clear all users (Testing only)
 *     description: This is not a production endpoint, only for testing purposes
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Users deleted
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: deleted
 */
// THIS IS NOT PRODUCTION FUNCTION ONLY FOR TESTING
router.delete("/clean", (req, res, next) => {
    exports.users = [];
    console.log("DELETED ", exports.users);
    res.send("deleted");
});
exports.default = router;
