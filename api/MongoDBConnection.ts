/* eslint-disable import/named */

import { config } from "dotenv";
import { createConnection } from "mongoose";

config();

/**
 * Setup and connect the MongoDB database connection
 */
export default function setupMongoDB() {
  return createConnection(process.env.MONGODB_URI as string);
}
