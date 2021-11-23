import dotenv from "dotenv";
import { DEVELOPMENT } from "./";

export const loadEnvironmentVariables = () => {
  if ((process.env.NODE_ENV = DEVELOPMENT)) {
    dotenv.config({ path: `.env.development` });
    return;
  }
};
