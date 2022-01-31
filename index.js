const express = require("express");
const app = express();
const authRoute = require("./routes/auth.routes");
const cors = require("cors");
const mongo = require("./mongo");
async function loadApp() {
  try {
    await mongo.connect();

    app.use(express.json());
    app.use(cors());

     app.use("/", authRoute);

    app.listen(process.env.PORT, () => console.log("server is starting"));
  } catch (err) {
    console.log(err);

    process.exit();
  }
}
loadApp();
