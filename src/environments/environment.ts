import environmentDev from "./environment.dev.js";
import environmentProd from "./environment.prod.js";

let environment;

switch (process.env.REACT_APP_ENV) {
  case "development":
    environment = environmentDev;
    break;
  case "production":
    environment = environmentProd;
    break;
  default:
    throw new Error("Unknown environment");
}

export default environment;
