import { Category } from "../model/category.model.js";
import { product } from "../model/product.model.js";

export const addCategory = (req,res,next) =>{
    let categoryName = req.body.categoryName;
    Category.create({
        categoryName:categoryName
    }).then(()=>{
        return res.status(200).json({message:"Category added successfully.."})
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"Internal server error"})
    });
}

export const addCategoryInBulk =async (req,res,next) =>{
    try{
        let categoryList = req.body;
        console.log(categoryList)
        for(let category of categoryList){
         await  Category.create({
                categoryName:category
            })
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})
    }
}