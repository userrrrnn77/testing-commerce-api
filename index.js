import app from "./api/app.js";
import serverless from "serverless-http";

const serverlessHandler = serverless(app);

export default async function handler(event, context) {
  return await serverlessHandler(event, context);
}
