import express from "express";
import fs from "fs";
import mysql from 'mysql2/promise'
import {initConnect} from '../index.js'
import { ksiazki, wypozyczenia, DaneOsobowe } from "../models/FormInsert.js";
import {findIfIsbnExists} from '../models/formFetch.js'
import { GenerateDateString } from "../helpers/GenerateDate.js";
const router = express.Router();

export const sendForm = async (req, res) => {
  let resObj = req.body;
  
  //Check if inputs are valid
  for (const [key, value] of Object.entries(resObj)) {
    if (value === "") {
      res.json({
        flag: 0,
        message: `coś poszło nie tak, nie wypełniłeś pola: ${key}`,
      });
    }
  }

 console.log(resObj)
 const connection = await initConnect()

 const [rows, fields] = await connection.execute(findIfIsbnExists(resObj.ISBN))
 if(rows.length == 0){
    await connection.execute(DaneOsobowe(resObj.imie, resObj.nazwisko, resObj.email, resObj.pesel))
    await connection.execute(ksiazki(resObj.wydawca, resObj.imie, resObj.ISBN))
    await connection.execute(wypozyczenia(resObj.pesel, resObj.wydawca, GenerateDateString()))

    res.status(200).end(JSON.stringify({ flag: 1, message: "udało się wysłać formularz" }));
 }else{
  res.status(200).end(JSON.stringify({ flag: 0, message: "podany ISBN jest juz w bazie" }));
 }
  
};

export const renderPage = async (req, res) => {
  const indexFile = fs.readFileSync("../index.html", {
    encoding: "utf-8",
    flag: "r",
  });

  res.send(indexFile);
};

export default router;
