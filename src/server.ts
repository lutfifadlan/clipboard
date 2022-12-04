import log4js from "log4js";
import app from "./app";

const logger = log4js.getLogger();
const port = process.env.APP_PORT || 3000;
logger.level = "info";

app.listen(port, () => {
  logger.info(`App listening on the port ${port}`);
});
