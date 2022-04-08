require("dotenv").config();
const app = require("./config/route");
app.listen(process.env.APP_PORT);