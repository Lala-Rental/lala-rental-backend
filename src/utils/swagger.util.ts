import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const APP_NAME = process.env.APP_NAME;
const APP_URL = process.env.APP_URL;

// Swagger definition
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: APP_NAME,
      version: "1.0.0",
      description: "API documentation for Lala Rental system",
    },
    servers: [
      {
        url: APP_URL, 
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to API route files
};

// Initialize Swagger docs
const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Swagger documentation available at ${APP_URL}/api-docs`);
};
