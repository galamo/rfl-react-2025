"use strict";
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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../../db"));
const getCategories_1 = __importDefault(require("./getCategories"));
const authorizations_1 = require("../../middleware/authorizations");
dotenv_1.default.config();
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Expense:
 *       type: object
 *       required:
 *         - amount
 *         - date
 *         - category
 *       properties:
 *         id:
 *           type: integer
 *           description: The expense ID
 *         amount:
 *           type: number
 *           format: float
 *           description: The expense amount
 *         date:
 *           type: string
 *           format: date
 *           description: The date of the expense
 *         category:
 *           type: string
 *           description: The expense category
 *         description:
 *           type: string
 *           description: Additional details about the expense
 *       example:
 *         id: 1
 *         amount: 125.50
 *         date: "2025-09-20"
 *         category: "Food"
 *         description: "Grocery shopping"
 *     ExpenseResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Expense'
 *     ExpenseCreateResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *         id:
 *           type: integer
 *       example:
 *         message: "Expense created successfully"
 *         id: 1
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *       example:
 *         message: "Expenses Error"
 */
const insertExpenses = `
        INSERT INTO northwind.expenses (id, date, category, amount, description)
        VALUES (?, ?, ?, ?, ?)
    `;
router.use((0, authorizations_1.validateAutMiddleware)(["admin", "configurator", "owner", "viewer"]));
/**
 * @swagger
 * /api/expenses:
 *   get:
 *     summary: Get all expenses
 *     description: Retrieve a list of all expenses ordered by date
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of expenses
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseResponse'
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const conn = yield (0, db_1.default)();
        const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            ORDER BY date DESC`;
        const rows = yield (conn === null || conn === void 0 ? void 0 : conn.execute(getExpensesBetweenDates, []));
        return res.json({ data: Array.isArray(rows) && rows[0] });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
/**
 * @swagger
 * /api/expenses/categories:
 *   get:
 *     summary: Get all expense categories
 *     description: Retrieve a list of all expense categories
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of expense categories
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/categories", (0, authorizations_1.validateAutMiddleware)(["configurator"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, getCategories_1.default)();
        return res.json({ data: result });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
/**
 * @swagger
 * /api/expenses/dates:
 *   get:
 *     summary: Get expenses between dates
 *     description: Retrieve expenses within a specified date range
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Start date (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: End date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: A list of expenses within the date range
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseResponse'
 *       400:
 *         description: Missing query parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Missing 'from' or 'to' query parameters"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/dates", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const from = req.query.from;
        const to = req.query.to;
        if (!from || !to) {
            return res
                .status(400)
                .json({ message: "Missing 'from' or 'to' query parameters" });
        }
        const conn = yield (0, db_1.default)();
        const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            WHERE date BETWEEN ? AND ?
            ORDER BY date ASC`;
        const rows = yield (conn === null || conn === void 0 ? void 0 : conn.execute(getExpensesBetweenDates, [from, to]));
        return res.json({ data: Array.isArray(rows) && rows[0] });
    }
    catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
}));
/**
 * @swagger
 * /api/expenses/expenses:
 *   post:
 *     summary: Create a new expense
 *     description: Add a new expense record
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - amount
 *               - category
 *               - date
 *             properties:
 *               amount:
 *                 type: number
 *                 format: float
 *                 description: The expense amount
 *               category:
 *                 type: string
 *                 description: The expense category
 *               date:
 *                 type: string
 *                 format: date
 *                 description: The date of the expense
 *               description:
 *                 type: string
 *                 description: Additional details about the expense
 *             example:
 *               amount: 125.50
 *               date: "2025-09-20"
 *               category: "Food"
 *               description: "Grocery shopping"
 *     responses:
 *       201:
 *         description: Expense created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ExpenseCreateResponse'
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *               example:
 *                 message: "Missing required fields: amount, category or date"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post("/expenses", (0, authorizations_1.validateAutMiddleware)(["admin", "configurator", "owner"]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Start FN  /expenses");
    try {
        const { amount, category, date, description } = req.body;
        if (!amount || !category || !date) {
            return res.status(400).json({
                message: "Missing required fields: amount, category or date",
            });
        }
        const conn = yield (0, db_1.default)();
        const params = [amount, date, category, description || null];
        const [result] = yield (conn === null || conn === void 0 ? void 0 : conn.execute(`INSERT INTO northwind.expenses (amount, date, category, description)
             VALUES (?, ?, ?, ?)`, params));
        const insertedId = result.insertId;
        return res.status(201).json({
            message: "Expense created successfully",
            id: insertedId,
        });
    }
    catch (error) {
        console.error("Failed to insert expense:", error);
        return res.status(500).json({ message: "expenses insert error" });
    }
}));
/**
 * @swagger
 * /api/expenses/sum-all-expenses:
 *   get:
 *     summary: Get sum of all expenses
 *     description: Calculate the total sum of all expenses
 *     tags: [Expenses]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total sum of expenses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: number
 *                   format: float
 *               example:
 *                 total: 1250.75
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get("/sum-all-expenses", (req, res, next) => {
    //   return res.json({ total: result });
});
exports.default = router;
