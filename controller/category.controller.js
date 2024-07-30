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
        return res.status(500).json({message:"add category"})
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"internal server error"})
    }
}

export const viewAllCategory = (req,res,next)=>{
    Category.findAll().then(result=>{
        return res.status(200).json({message:"Categories",categories:result});
    }).catch(err=>{
        return res.status(401).json({message:"Internal server error.."})
    });
}

export const removeCategory = (req, res, next) => {
    Category.destroy({ where: { categoryName: req.body.categoryName } }).then(result => {
        return res.status(200).json({ message: "category removed successfully..."})
    }).catch(err => {
        return res.status(401).json({ message: "Something went wrong" })
    });
}


export const fewcategory = (req, res, next) => {
    Category.findAll({
        raw: true, // Return plain JSON objects instead of Sequelize instances
        limit: 10,
    })
    .then(result => {
        // const uniqueBrands = result.map(item => item.brand); // Extract unique brand names
        return res.status(200).json({ message: "category", data: result });  
    })
    .catch(err => {
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    });
};