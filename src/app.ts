import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";

import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(todoRoutes);

const url: any = process.env.MONGO_URL;
const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);

mongoose
  .connect(url, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  );
