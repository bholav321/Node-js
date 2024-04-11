import { Category } from "../model/category.model.js";
import { product } from "../model/product.model.js";

import xlsx from 'xlsx'

export const addProduct = async(req,res,next)=>{
    const workbook = xlsx.readFile('Products.xlsx');
    const sheet_name = workbook.SheetNames[0]; // Assuming you want to read the first sheet
    const sheet = workbook.Sheets[sheet_name];
    console.log(req.body);
    // Convert the sheet to JSON
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);
    try{
        for(let item of data){
            let thumbnail = item.thumbnail;
            let price = item.price;
            let title = item.title;
            let categoryName = item.categoryName;
            let discountPercentage = item.discountPercentage;
            let rating = item.rating;
            let stock = 100;
            let brand = 'local';
            let images = 'none';
            let description = item['description '];
            console.log(thumbnail+" "+price+" "+title+" "+categoryName+" "+discountPercentage+" "+rating)
          await product.create({
             title,description,price,discountPercentage,rating,stock,brand,thumbnail,
             categoryName,images 
          })
         }
         return res.status(200).json({message:"product added successfully.."})
    }catch(err){
        console.log(err); 
        return res.status(501).json({message:"Internal server error"})
    }
}



// export const addProduct = (req,res,next) =>{
//     let filename = req.file.filename;
//     console.log(filename)
//     let id = req.body.id;
//     let title = req.body.title;
//     let price = req.body.price;
//     let description = req.body.description;
//     let discountPercentage = req.body.discountPercentage;
//     let rating = req.body.rating;
//     let stock = req.body.stock;
//     let brand = req.body.brand;
//     let thumbnail = 'images/'+filename+".png";
//     let categoryName = req.body.categoryName;
//     let images = req.body.images;
//     product.create({
//         id,title,description,price,discountPercentage,rating,stock,brand,thumbnail,
//         categoryName,images 
//     }).then(()=>{
//         return res.status(200).json({message:"product added.."})
//     }).catch(err=>{
//         console.log(err);
//         return res.status(401).json({message:"Something went wrong"})
//     })
// }

export const viewProductsByCategory = (req,res,next)=>{
    product.findAll({where:{categoryName:req.params.categoryName}}).then(result=>{
        return res.status(200).json({message:"Categories",data:result});
    }).catch(err=>{
        console.log(err);
        return res.status(401).json({message:"internal server error.."})
    });
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
                 images += " , "+img;
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



/*
association


one to one 
user.hasOne(cart,{
    foreignKey:'userId'
})
cart.blongsTo(user,{
    foreignKey:'id'
})

one to many
category.hasMany(product,{
    foreignkey:'cateogryname'
})
product.belongsTo(category,{
    foreignKey:'categoryname'
})

many to many

*/