import Product from "../module/product.module.js";
import path from "path";

export const productList = (req,res,next) =>{
        Product.productList().then(result => {
            res.status(200).json({ message: "Products ", data: { result } });
        }).catch(err => {
            console.log("Data not found")
            res.status(401).json({ message: "internal server error..." })
        })
    }

export const addProduct = (req, res, next) => {
    let filename = req.file.filename;
    let categoryId = req.body.categoryId; 
    let title = req.body.title;
    let description = req.body.description;
    let brand = req.body.brand;
    let price = req.body.price;
    let thumbnail = "images/"+filename;

    let product = new Product(categoryId, title, description,brand,price,thumbnail);
    product.addProduct().then(result => {
        res.status(200).json({ message: "Product added " });
    }).catch(err => {
        console.log(err);
        res.status(401).json({ message: "internal server error.." })
    })
 }

 export const showById = (req,res,next) =>{
    let id = req.body.id;
    Product.showById(id).then(result => {
        res.status(200).json({ category: result});
    }).catch(err => {
        console.log("Data not found")
        res.status(401).json({ message: "internal server error..." })
    })
}


 export const deleteProdcut = (req,res,next) =>{
    let id = req.body.id;
    Product.deleteProdcut(id).then(result => {
        res.status(200).json({ message: "Product deleted successfully... "});
    }).catch(err => {
        console.log("Data not found")
        res.status(401).json({ message: "internal server error..." })
    })
}

export const category = (req,res,next) =>{
    Product.showByCategory().then(result => {
        res.status(200).json({ message: "Prodcut",product:({result})});
    }).catch(err => {
        console.log("Data not found")
        res.status(401).json({ message: "internal server error..." })
    })
}
