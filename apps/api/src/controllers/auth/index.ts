import express, { Request, Response, NextFunction } from "express";
import { login } from "./loginHandler";
import { ERRORS } from "../../enum/httpStatus";
import * as z from "zod";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { register } from "./registrationHandler";
import { getUserRole } from "./getUserRole";
dotenv.config();
const router = express.Router();

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

export type User = z.infer<typeof User>;
export type UserRegister = z.infer<typeof UserRegister>;

export let users: Array<Partial<UserRegister>> = [
  { userName: "admin@gmail.com", password: "admin" },
];

const mappingSchemaValidation: { [key: string]: z.ZodSchema } = {
  login: User,
  register: UserRegister,
  "forgat-password": fp,
};

function authInputValidation(req: Request, res: Response, next: NextFunction) {
  const url = req.url.replace("/", "");
  const currentSchema = mappingSchemaValidation[url];
  const validation = currentSchema.safeParse(req.body);
  if (!validation.success) {
    console.log(validation.error);
    throw new Error(ERRORS.BAD_REQUEST);
  } else {
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
router.post("/login", authInputValidation, async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    const foundUser = await login({ userName, password });
    if (foundUser) {
      const roleResult = await getUserRole(foundUser.id);

      const token = jwt.sign(
        {
          userName: foundUser.userName,
          isAdmin: roleResult?.role?.toLowerCase() === "admin",
          role: roleResult?.role,
          userId: foundUser.id,
        },
        (process.env.SECRET as string) || "secret",
        { expiresIn: "5h" }
      );
      return res
        .setHeader("Authorization", token)
        .json({ message: "User logged in successfully", token });
    } else throw new Error(ERRORS.UNAUTH);
  } catch (error) {
    console.log(error);
    return next(new Error((error as Error).message));
  }
});

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
router.post("/register", authInputValidation, async (req, res, next) => {
  try {
    const { userName, password, phone, age } = req.body;
    const result = await register({ userName, password, phone, age });
    if (result) {
      return res.json({ message: "User Registered in successfully" });
    } else throw new Error("user already exist");
  } catch (error: any) {
    console.log(error.message);
    return next(new Error((error as Error).message));
  }
});

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

        if (userName) return res.json({ message: "password reset!" });
        else throw new Error(ERRORS.UNAUTH);
    } catch (error) {
        console.log(error);
        return next(new Error((error as Error).message));
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
    users = [];
    console.log("DELETED ", users);
    res.send("deleted");
});

export default router;
