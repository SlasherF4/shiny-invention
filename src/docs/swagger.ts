import swaggerJSDoc, { Options } from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express-serve-static-core";

// Basic Meta Informations about our API
const options: Options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "DinoKids API", version: "2.0.0" },
  },
  apis: ["./src/routes/products.routes.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

const swaggerDocs = (app: Express, port?: string) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 2 Docs are available on http://localhost:${port}/api/docs`
  );
};

export default swaggerDocs;