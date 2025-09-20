import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import dotenv from "dotenv";
import data from "../../data/index.json";
import getConnection from "../../db";
dotenv.config();
const router = express.Router();
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
router.get("/countries-rfl", async (req, res, next) => {
  res.json(data);
});
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
router.get("/countries-delay/name/:name", async (req, res, next) => {
  delayName++;

  try {
    console.log(req?.params?.name);
    const result = data.filter((item) => {
      console.log(
        item?.name?.common?.includes(req?.params?.name?.toLowerCase())
      );
      return item?.name?.common
        ?.toLowerCase()
        ?.includes(req?.params?.name?.toLowerCase());
    });
    // const { data } = await axios.get(
    //   `https://restcountries.com/v3.1/name/${req.params.name}`
    // );
    if (delayName % 2 === 0) {
      setTimeout(() => {
        return res.json({ result });
      }, 1000);
    } else {
      return res.json({ result });
    }
  } catch (error) {
    return next(error);
  }
});
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
router.get("/countries/code/:code", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `https://restcountries.com/v3.1/alpha/${req.params.code}`
    );
    return res.json({ data });
  } catch (error) {
    return next(error);
  }
});
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
router.get("/countries-delay", async (req, res, next) => {
  try {
    // const { data } = await axios.get("https://restcountries.com/v3.1/all");
    setTimeout(() => {
      return res.json({ data });
    }, 1000);
  } catch (error) {
    return next(error);
  }
});

export default router;
