require("dotenv").config(); //go read the .env file

const mongoose = require("mongoose");

const app = require("./app");

const port = 8080;

mongoose //connect to database is before server listen b/c database is priority no. 1
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(3000, () => {
      console.log(`Server connected on ${port}`);
      console.log("MONGODB CONNECTED");
    });
  })
  .catch((e) => {
    console.log(e);
  });
