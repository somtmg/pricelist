import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const cred = process.env.DEV_DATABASE_URL;
const sequelize = new Sequelize(cred, {
  dialect: "postgres",
  logging: false,
});

export default sequelize;
