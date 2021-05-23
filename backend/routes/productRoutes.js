import express from 'express';
import Product from '../models/productModel';
import {isAuth, isAdmin} from '../util';


const router = express.Router();

router.get("/", async (req, res) => {
    const products = await Product.find({});
    res.send(products);
});

router.get("/:id", async (req, res) =>{
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(product){
            res.send(product);
        }
        else {
            res.status(404).send({msg: "Product not found."})
        }
})
    
router.post("/", isAuth, isAdmin, async (req, res) => {
   const product = new Product({
    name: req.body.name,
    image: req.body.image,
    seller: req.body.seller,
    category: req.body.category,
    price: req.body.price,
    countInStock: req.body.countInStock,
    description: req.body.description
   });
   const newProduct = await product.save();
   if(newProduct){
       res.status(201).send({message: 'New Product created.', data: newProduct});
   }
   return res.status(500).send({message: 'Error in creating product.'});
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if(product){
        
            product.name =  req.body.name;
            product.image =  req.body.image;
            product.seller =  req.body.seller;
            product.category =  req.body.category;
            product.price =  req.body.price;
            product.countInStock =  req.body.countInStock;
            product.description =  req.body.description;
            const updatedProduct = await product.save();
            if(updatedProduct){
                res.status(200).send({message: 'Product Updated', data: updatedProduct});
            }
        }
    return res.status(500).send({message: 'Error in updating product.'});
 });

 router.delete("/:id", isAuth, isAdmin, async(req,res) => {
     const productId = req.params.id;
     const product = await Product.findById(productId);
     if(product) {
         var deletedProduct = await product.delete()
         if(deletedProduct){
             res.status(200).send({message: 'Product Deleted successfully', data: deletedProduct});
         }
     }

     return res.status(500).send({message: 'Error in deleting product'});
 });

export default router;