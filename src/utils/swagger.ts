import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

// Swagger definition
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lala Rental API",
      version: "1.0.0",
      description: "API documentation for Lala Rental system",
    },
    servers: [
      {
        url: "http://localhost:4000", // Change to your actual API URL
        description: "Local development server",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Path to API route files
};

// Initialize Swagger docs
const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger documentation available at /api-docs");
};
