import { config } from "dotenv";
import { Logger } from "./Logger";
import app from "./Managers/ServerManager";

config();

const logger = new Logger();

logger.info({
  message: "API v1 Has Connected To The Server on Port 3000",
  title: "API",
  subTitle: "Express::Server",
});

export default app;
