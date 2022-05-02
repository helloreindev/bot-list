/* eslint-disable-next-line */
import Express from "express";
import router from "./RouterManager";

const app = Express();

app.use(router);

export default app;
