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
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const index_json_1 = __importDefault(require("../../data/index.json"));
dotenv_1.default.config();
const router = express_1.default.Router();
let delayName = 0;
/**
 * @swagger
 * components:
 *   schemas:
 *     Country:
 *       type: object
 *       properties:
 *         name:
 *           type: object
 *           properties:
 *             common:
 *               type: string
 *               description: Common name of the country
 *             official:
 *               type: string
 *               description: Official name of the country
 *         capital:
 *           type: array
 *           items:
 *             type: string
 *           description: Capital cities
 *         region:
 *           type: string
 *           description: Region of the country
 *         population:
 *           type: integer
 *           description: Population count
 *         flags:
 *           type: object
 *           properties:
 *             png:
 *               type: string
 *               description: URL to PNG flag image
 *             svg:
 *               type: string
 *               description: URL to SVG flag image
 *     CountryResponse:
 *       type: object
 *       properties:
 *         result:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Country'
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Country'
 */
/**
 * @swagger
 * /api/data/countries-rfl:
 *   get:
 *     summary: Get all countries
 *     description: Retrieve a list of all countries
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: A list of countries
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Country'
 */
router.get("/countries-rfl", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(index_json_1.default);
}));
/**
 * @swagger
 * /api/data/countries-delay/name/{name}:
 *   get:
 *     summary: Search countries by name with potential delay
 *     description: Search for countries by name, with a random delay on every other request
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Country name to search for
 *     responses:
 *       200:
 *         description: List of countries matching the search term
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountryResponse'
 *       500:
 *         description: Server error
 */
router.get("/countries-delay/name/:name", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    delayName++;
    try {
        console.log((_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.name);
        const result = index_json_1.default.filter((item) => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
            console.log((_b = (_a = item === null || item === void 0 ? void 0 : item.name) === null || _a === void 0 ? void 0 : _a.common) === null || _b === void 0 ? void 0 : _b.includes((_d = (_c = req === null || req === void 0 ? void 0 : req.params) === null || _c === void 0 ? void 0 : _c.name) === null || _d === void 0 ? void 0 : _d.toLowerCase()));
            return (_g = (_f = (_e = item === null || item === void 0 ? void 0 : item.name) === null || _e === void 0 ? void 0 : _e.common) === null || _f === void 0 ? void 0 : _f.toLowerCase()) === null || _g === void 0 ? void 0 : _g.includes((_j = (_h = req === null || req === void 0 ? void 0 : req.params) === null || _h === void 0 ? void 0 : _h.name) === null || _j === void 0 ? void 0 : _j.toLowerCase());
        });
        // const { data } = await axios.get(
        //   `https://restcountries.com/v3.1/name/${req.params.name}`
        // );
        if (delayName % 2 === 0) {
            setTimeout(() => {
                return res.json({ result });
            }, 1000);
        }
        else {
            return res.json({ result });
        }
    }
    catch (error) {
        return next(error);
    }
}));
/**
 * @swagger
 * /api/data/countries/code/{code}:
 *   get:
 *     summary: Get country by country code
 *     description: Retrieve country information by its alpha code
 *     tags: [Countries]
 *     parameters:
 *       - in: path
 *         name: code
 *         required: true
 *         schema:
 *           type: string
 *         description: Country alpha code (e.g., US, GB, IL)
 *     responses:
 *       200:
 *         description: Country information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountryResponse'
 *       404:
 *         description: Country not found
 *       500:
 *         description: Server error
 */
router.get("/countries/code/:code", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { data } = yield axios_1.default.get(`https://restcountries.com/v3.1/alpha/${req.params.code}`);
        return res.json({ data });
    }
    catch (error) {
        return next(error);
    }
}));
/**
 * @swagger
 * /api/data/countries-delay:
 *   get:
 *     summary: Get all countries with delay
 *     description: Retrieve a list of all countries with a 1-second delay
 *     tags: [Countries]
 *     responses:
 *       200:
 *         description: A list of countries (delayed response)
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CountryResponse'
 *       500:
 *         description: Server error
 */
router.get("/countries-delay", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { data } = await axios.get("https://restcountries.com/v3.1/all");
        setTimeout(() => {
            return res.json({ data: index_json_1.default });
        }, 1000);
    }
    catch (error) {
        return next(error);
    }
}));
exports.default = router;
