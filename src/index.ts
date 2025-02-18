import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import bodyParser from 'body-parser';
import routes from "./routes/index.routes";
import { setupSwagger } from "./utils/swagger.util";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(session({ secret: process.env.JWT_SECRET as string, resave: false, saveUninitialized: false }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", routes);

setupSwagger(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
