import Fastify from "fastify";
import sequelize from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import dotenv from "dotenv";
import cors from "@fastify/cors";
import seedDatabase from "./seeders/seedDatabase.js";

dotenv.config();
const fastify = Fastify({ logger: false });

fastify.register(cors, {
  origin: process.env.CORS_ORIGIN,
  methods: ["GET", "POST", "PUT", "DELETE"],
});
const PORT = process.env.PORT || 3000;

// Parse JSON bodies
fastify.addContentTypeParser(
  "application/json",
  { parseAs: "string" },
  (req, body, done) => {
    try {
      done(null, JSON.parse(body));
    } catch (err) {
      done(err);
    }
  }
);

// Register routes
fastify.register(productRoutes);

// Sync database and start server
const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    fastify.log.info("Database connected successfully");
    if (
      process.env.NODE_ENV !== "production" ||
      process.env.SEED_DATABASE === "true"
    ) {
      await seedDatabase(); 
    } else {
      fastify.log.info("Skipping seeding in production.");
    }

    await fastify.listen({ port: PORT, host: "0.0.0.0" });
    fastify.log.info(`Server listening on http://localhost:${PORT}`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
