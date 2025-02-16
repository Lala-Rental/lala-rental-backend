import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import bodyParser from "body-parser";
import routes from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET as string, resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
