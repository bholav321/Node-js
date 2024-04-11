import { User } from "../model/user.model.js";
import Wishlist from "../model/wishlist.model.js";
import { product } from "../model/product.model.js";

export const addProductIntoWishlist = async (req, res, next) => {
    let { userId, productId } = req.body;
    let isExists = !! await Wishlist.findOne({ raw: true, where: { userId, productId } });
    if (isExists)
        return res.status(200).json({ message: "Product is already added in wishlist" });
    await Wishlist.create({
        userId, productId
    }).then(result => {
        return res.status(200).json({ message: "product successfully added into wishlist", result });
    }).catch(err => {
        return res.status(401).json({ message: "Something went wrong" })
    });

}

export const removeItemFromList = (req, res, next) => {
    let { userId, productId } = req.body;
    Wishlist.destroy({ where: { userId, productId } }).then(result => {
        return res.status(200).json({ message: "Remove item from wishlist..." })
    }).catch(err => {
        return res.status(401).json({ message: "Something went wrong",err })
    });

}

// export const viewAllFavouriteProducts  = (req,res,next)=>{
//     const userId = req.body.userId;
//     Wishlist.findAll({where:{userId}}).then(result=>{
//         return res.status(200).json({message:"All Favourite Products ",result})
//      }).catch(err=>{
//         return res.status(400).json({message:"Error in getting data",err});
//      });
// }

export const viewAllFavouriteProducts = (req, res, next) => {
    console.log("wishlist called..");
    let userId = req.body.userId;
    User.findAll({
        include: [
            {
                model: Wishlist,
                required: true,
                where: { userId },
                include: {
                    model: product
                }
            }
        ]
    }).then(result => {
        return res.status(200).json({ message: "User wishlist products", wishlist: result })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Internal server error..." })
    });
}


export const removeItemFromWishList = async (req, res, next) => {
    let { userId, productId } = req.params;
    await Wishlist.destroy({ where: { userId, productId }, raw: true }).then((result) => {
        return res.status(200).json({ message: "Product removed successfully..", product: result })
    }).catch(err => {
        console.log(err);
        return res.status(401).json({ message: "Internal server error" })
    });
}

product.hasMany(Wishlist);
Wishlist.belongsTo(product)