import express from "express";
import fs from "fs";
const router = express.Router();

export const sendForm = async (req, res) => {
  let resObj = req.body;
  for (const [key, value] of Object.entries(resObj)) {
    if (value === "") {
      res.json({
        flag: 0,
        message: `coś poszło nie tak, nie wypełniłeś pola: ${key}`,
      });
    }
  }
  res.json({ flag: 1, message: "udało się wysłać formularz" });
};

export const renderPage = async (req, res) => {
  const indexFile = fs.readFileSync("../index.html", {
    encoding: "utf-8",
    flag: "r",
  });

  res.send(indexFile);
};

export default router;
