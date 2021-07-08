require("dotenv").config(); //go read the .env file

const mongoose = require("mongoose"); //bring in mongoose

const app = require("./app"); //bring in app

const port = 8080; //set the port variable

mongoose //connect to database is before server listen b/c database is priority no. 1
  .connect(process.env.MONGO_DB, {
    //connect to db
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      //listen on our port and display success messages
      console.log(`Server connected on ${port}`);
      console.log("MONGODB CONNECTED");
    });
  })
  .catch((e) => {
    //catch all errors
    console.log(e); //display the errors in consoled
  });
