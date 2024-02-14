
import Category from "../module/category.module.js";
// import multer from "multer";
// import path from 'path';

// const storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// const upload = multer({storage:storage});

export const category = (req, res, next) => {
    let list = req.body;
    for (let item of list) {
        let id = item.id;
        let categoryName = item.category;
        let cat = new Category(id, categoryName);
        cat.pushCategory().then(result => {
            console.log("category added..");
            // res.status(200).json({ message: "category added successfully..", data: { id, categoryName } });
        }).catch(err => {
            // console.log("Duplicate data found")
            // res.status(401).json({ message: "internal server error..." })
        })
    }
    res.status(200).json({ message: "category added successfully.." });
    console.log("category added...")
}

export const addCategory = (req, res, next)=>{
    let category = req.body.category;
    let cat = new Category(category);
    cat.addCategory().then(result=>{
        res.status(200).json({message:"category added successfully.."})
    }).catch(err=>{
        res.status(401).json({message:"Internal server error.."});
    });
}

export const deleteCategory = (req,res,next)=>{
    let id = req.body.id;
    let category = new Category(id,null);
    category.deleteCategory().then(result=>{
        res.status(200).json({ message: "category deleted successfully..", data: { result } });
    }).catch(err=>{
        res.status(401).json({message:"Record not found "});
    });
}
export const show = (req, res, next) => {
    Category.showCategory().then(result => {
        console.log("Sign in successed");
        res.status(200).json({ message: "Category ", data: { result} });
    }).catch(err => {
        console.log("Data not found")
        res.status(401).json({ message: "internal server error..." })
    })
}
