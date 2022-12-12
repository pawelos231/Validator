import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import formRoutes from "./routes/form.js";
import mysql from 'mysql2/promise'
const app = express();

export const initConnect = async () =>{
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'panini',
        database: 'panini',
        password: "(s/sRrrQWkIz61Xu"
     });
     return connection
}


app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", formRoutes);

app.listen(2020);
