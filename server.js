require('dotenv').config();
const app = require("./app.js");
const port = process.env.PORT || 3000;
const connect = require("./db/connect");

const start = async () => {
    try {
     await connect(process.env.MONGO_URL);

     console.log("Connection Successful!");

     app.listen(port, () => {
        console.log("server is listening on port " + port + "....");
     })
 } catch (err) {
    console.log(err.message);
  }
}
 
 start();