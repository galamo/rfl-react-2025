import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import getConnection from "../../db";
import getCategories from "./getCategories";
import { ReqLocal } from "../../middleware/authorizationMiddleware";
import { validateAutMiddleware } from "../../middleware/authorizations";

dotenv.config();
const router = express.Router();

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

router.use(validateAutMiddleware(["admin", "configurator", "owner", "viewer"]));

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
router.get("/", async (req, res, next) => {
  try {
    const conn = await getConnection();
    const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            ORDER BY date DESC`;

    const rows = await conn?.execute(getExpensesBetweenDates, []);

    return res.json({ data: Array.isArray(rows) && rows[0] });
  } catch (error) {
    res.json({ message: `there was an error ${error}` });
    return res.status(500).json({ message: "Expenses Error" });
  }
});

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
router.get(
    "/categories",
    validateAutMiddleware(["configurator"]),
    async (req, res, next) => {
        try {
            const result = await getCategories();

            return res.json({ data: result });
        } catch (error) {
            res.json({ message: `there was an error ${error}` });
            return res.status(500).json({ message: "Expenses Error" });
        }
    }
);

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
router.get("/dates", async (req, res, next) => {
    try {
        const from = req.query.from as string;
        const to = req.query.to as string;
        if (!from || !to) {
            return res
                .status(400)
                .json({ message: "Missing 'from' or 'to' query parameters" });
        }

        const conn = await getConnection();
        const getExpensesBetweenDates = `SELECT *
            FROM northwind.expenses
            WHERE date BETWEEN ? AND ?
            ORDER BY date ASC`;

        const rows = await conn?.execute(getExpensesBetweenDates, [from, to]);

        return res.json({ data: Array.isArray(rows) && rows[0] });
    } catch (error) {
        res.json({ message: `there was an error ${error}` });
        return res.status(500).json({ message: "Expenses Error" });
    }
});

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
router.post(
  "/expenses",
  validateAutMiddleware(["admin", "configurator", "owner"]),
  async (req, res, next) => {
    console.log("Start FN  /expenses");
    try {
      const { amount, category, date, description } = req.body;
      if (!amount || !category || !date) {
        return res.status(400).json({
          message: "Missing required fields: amount, category or date",
        });
      }

      const conn = await getConnection();
      const params = [amount, date, category, description || null];
      const [result]: any = await conn?.execute(
        `INSERT INTO northwind.expenses (amount, date, category, description)
             VALUES (?, ?, ?, ?)`,
        params
      );
      const insertedId = result.insertId;

      return res.status(201).json({
        message: "Expense created successfully",
        id: insertedId,
      });
    } catch (error) {
      console.error("Failed to insert expense:", error);
      return res.status(500).json({ message: "expenses insert error" });
    }
  }
);

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

export default router;
