import express, { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import routes from "./api/routes/index";

const { urlencoded, json } = bodyParser;
const { connect } = mongoose;

const app = express();

const BaseUrl: any = process.env.MONGO_URL;

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());

app.use("/v1", routes);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Route Not Found");
  error.status = 404;
  next(error);
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message,
    },
  });
});

app.use("/v1", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({ message: "Welcome to typescript and Node js Api" });
});

connect(BaseUrl);

export default app;
