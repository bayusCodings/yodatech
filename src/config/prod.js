require("dotenv").config({ path: __dirname+"/../../.env" });

module.exports = {
  ENVIRONMENT: process.env.NODE_ENV,
  BASE_URL: process.env.BASE_URL,
  REDIS_URL: process.env.REDIS_URL,
  DOMAIN: process.env.DOMAIN
}