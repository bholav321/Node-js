import { Category } from "../model/category.model.js";
import { product } from "../model/product.model.js";

export const addProduct = (req,res,next) =>{
    let id = req.body.id;
    let title = req.body.title;
    let price = req.body.price;
    let description = req.body.description;
    let discountPercentage = req.body.discountPercentage;
    let rating = req.body.rating;
    let stock = req.body.stock;
    let brand = req.body.brand;
    let thumbnail = req.body.thumbnail;
    let categoryName = req.body.categoryName;
    let images = req.body.images;
    product.create({
        id,title,description,price,discountPercentage,rating,stock,brand,thumbnail,
        categoryName,images 
    }).then(()=>{
        return res.status(200).json({message:"product added.."})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Something went wrong"})
    })
}

export const viewAllProducts = (req,res,next)=>{
    product.findAll().then((result)=>{
        return res.status(200).json({products:result})
    }).catch(err=>{
        console.log(err)
        return res.status(401).json({message:"Something went wrong"})
    })
}

export const removeProduct = (req,res,next)=>{
    let productId = req.body.productId;
    product.destroy({where:{id:productId}}).then((result)=>{
        return res.status(200).json({message:"Product removed successfully..",product:result})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error"})
    });
}

export const viewAllByCategory = (req,res,next)=>{
    Category.findAll({
       include: [{
        model:product,
        required:true
       }]
    }).then(result => {
            return res.status(200).json({message:"products data ",data:result})
      }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"products ",data:err})
      });
}

export const addProductInBulk = async(req,res,next)=>{
    let productList = req.body;
    console.log(product)
    try{
        for(let item of productList){
            let {id,title,description,price,discountPercentage,rating,stock,brand,thumbnail} = item;
            let categoryName = item.category;
            let images;
            for(let img of item.images){
                 images +=  img+ " , "
            }
          await product.create({
             id,title,description,price,discountPercentage,rating,stock,brand,thumbnail,
             categoryName,images 
          })
         }
         return res.status(200).json({message:"product added successfully.."})
    }catch(err){
        console.log(err); 
        return res.status(501).json({message:"Internal server error"})
    }
    
}