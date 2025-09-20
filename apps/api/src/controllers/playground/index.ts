import express, { Request, Response, NextFunction } from "express";
import axios from "axios";
import dotenv from "dotenv";
import data from "../../data/index.json";
import getConnection from "../../db";
dotenv.config();
const router = express.Router();
let delayName = 0;
router.get("/countries-rfl", async (req, res, next) => {
  res.json(data);
});
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
