import express from 'express';
import data from './data';
import config from './config';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoute from "./routes/userRoutes";
import productRoute from "./routes/productRoute";

dotenv.config();

const mongoDbUrl = config.MONGODB_URL;
mongoose.connect(mongoDbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).catch( error => console.log(error.reason));


const app = express();
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
// app.get("/api/products/:id", (req, res) =>{
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id == productId);
//     if(product){
//         res.send(product);
//     }
//     else {
//         res.status(404).send({msg: "Product not found."})
//     }
// })

// app.get("/api/products/", (req, res) =>{
//     console.log("Data requested.")
//     res.send(data.products);
// })

app.listen(5000, () => {console.log("Server started at http://localhost:5000/")});