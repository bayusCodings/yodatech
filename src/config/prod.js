require("dotenv").config({ path: __dirname+"/../../.env" });

module.exports = {
  ENVIRONMENT: process.env.NODE_ENV,
  BASE_URL: process.env.BASE_URL,
  DOMAIN: process.env.DOMAIN
}