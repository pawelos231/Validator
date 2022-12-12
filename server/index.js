import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import formRoutes from "./routes/form.js";
const app = express();

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/", formRoutes);

app.listen(2017);
