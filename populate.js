require("dotenv").config();
const connectDB = require("./db/connect");
const Product = require("./models/product");
const jsonProducts = require('./products.json')


const start = async () => {
    try {
     await connectDB(process.env.MONGO_URL);
     await Product.deleteMany();
     await Product.create(jsonProducts)
     console.log("connection success!")
     process.exit(0);
 } catch (err) {
         console.log(err.message);
         process.exit(1);
     }
 }
 
 start();



   // const { featured, company, name } = req.query;
    // const queryObject = {};

    // if(featured) {
    //     queryObject.featured = featured === "true" ? true : false
    // }

    // if(company) {
    //     queryObject.company = company
    // }

    // if(name) {
    //     queryObject.name = { $regex: name, $options: "i"}
    // }