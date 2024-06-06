const mongoose = require("mongoose");
// mongoose.set("strictQuery", false);
const DB_URI = process.env.DB_URI;
// connecting to mongodb
mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("DB Ready To Use");
  })
  .catch((err) => {
    console.log(err);
  });
