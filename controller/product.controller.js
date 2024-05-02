import { where } from "sequelize";
import { Category } from "../model/category.model.js";
import { product } from "../model/product.model.js";

import xlsx from 'xlsx'

export const addExcelSheet = async (req, res, next) => {
    console.log(req.body)
    // const workbook = xlsx.readFile('Products.xlsx');
    // const sheet_name = workbook.SheetNames[0]; // Assuming you want to read the first sheet
    // const sheet = workbook.Sheets[sheet_name];
    // console.log(req.body);
    // // Convert the sheet to JSON
    // const data = xlsx.utils.sheet_to_json(sheet);
    // console.log(data);
    // try {
    //     for (let item of data) {
    //         let thumbnail = item.thumbnail;
    //         let price = item.price;
    //         let title = item.title;
    //         let categoryName = item.categoryName;
    //         let discountPercentage = item.discountPercentage;
    //         let rating = item.rating;
    //         let stock = 100;
    //         let brand = 'local';
    //         let images = 'none';
    //         let description = item['description '];
    //         console.log(thumbnail + " " + price + " " + title + " " + categoryName + " " + discountPercentage + " " + rating)
    //         await product.create({
    //             title, description, price, discountPercentage, rating, stock, brand, thumbnail,
    //             categoryName, images
    //         })
    //     }
    //     return res.status(200).json({ message: "product added successfully.." })
    // } catch (err) {
    //     console.log(err);
    //     return res.status(501).json({ message: "Internal server error" })
    // }
}



export const addoneproduct = (req, res, next) => {
    // let filename = req.file.filename;
    // console.log(filename)
    const prodcutData = req.body.productdata;
    let id = prodcutData.id;
    let title = prodcutData.title;
    let price = prodcutData.price;
    let description = prodcutData.description;
    let discountPercentage = prodcutData.discountPercentage;
    let rating = prodcutData.rating;
    let stock = prodcutData.stock;
    let brand = prodcutData.brand;
    // let thumbnail = 'images/'+filename+".png";
    let thumbnail = prodcutData.thumbnail;
    let categoryName = prodcutData.categoryName;
    let images = prodcutData.images;
    let imageArr;
    for (let item of prodcutData.images) {
        imageArr += item;
    }
    product.create({
        id, title, description, price, discountPercentage, rating, stock, brand, thumbnail,
        categoryName, images: imageArr
    }).then(() => {
        return res.status(200).json({ message: "product added.." })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Something went wrong" })
    })
}
export const viewProductsByCategory = (req, res, next) => {
    product.findAll({ where: { categoryName: req.params.categoryName } }).then(result => {
        return res.status(200).json({ message: "Categories", data: result });
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "internal server error.." })
    });
}

export const viewAllProducts = async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

    try {
        const offset = (page - 1) * limit;
        // Fetch products with pagination
        const products = await product.findAll({ offset, limit });

        return res.status(200).json({ products });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Something went wrong" });
    }
};



export const displayAllProducts = (req, res, next) => {
    product.findAll().then(
        result => {
            res.status(200).json({ message: "all products", result })
        }
    ).catch(err => {
        console.log(err)
        return res.status(5001).json({ message: "internal server error" })
    });
};


export const removeProduct = (req, res, next) => {
    let productId = req.body.productId;
    product.destroy({ where: { id: productId } }).then((result) => {
        return res.status(200).json({ message: "Product removed successfully..", product: result })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Internal server error" })
    });
}

export const viewAllByCategory = (req, res, next) => {
    Category.findAll({
        include: [{
            model: product,
            required: true
        }]
    }).then(result => {
        return res.status(200).json({ message: "products data ", data: result })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "products ", data: err })
    });
}

export const addProductInBulk = async (req, res, next) => {
    let productList = req.body;
    console.log(product)
    try {
        for (let item of productList) {
            let { id, title, description, price, discountPercentage, rating, stock, brand, thumbnail } = item;
            let categoryName = item.category;
            let images;
            for (let img of item.images) {
                images += " , " + img;
            }
            await product.create({
                id, title, description, price, discountPercentage, rating, stock, brand, thumbnail,
                categoryName, images
            })
        }
        return res.status(200).json({ message: "product added successfully.." })
    } catch (err) {
        console.log(err);
        return res.status(501).json({ message: "Internal server error" })
    }

}

export const updateRating = (req, res, next) => {
    const { productId, rating } = req.body;
    product.update({ rating: rating }, { where: { id: productId } }).then(result => {
        return res.status(200).json({ message: "update rating", result })
    }).catch(err => {
        console.log(err)
        return res.status(501).json({ message: "Internal server error" })
    });
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