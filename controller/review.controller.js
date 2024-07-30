import { product } from "../model/product.model.js"
import Review from "../model/review.model.js"
import { User } from "../model/user.model.js"

export const addreview = (req, res, next) => {
    Review.create({
        comment: req.body.comment,
        rating: req.body.rating,
        userId: req.body.userId,
        productId: req.body.productId
    })
        .then(result => {
            return res.status(200).json({ message: 'submit feedback', result })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({ error: 'something went wrong' })
        })
}
export const viewAllReviewOnParticularProduct = (req, res, next) => {
    let productId = req.params.productId;

    Review.findAll({ 
        where: { productId },
        include: [
            { model: User },
            { model: product }
        ]
    })
    .then(result => {
        return res.status(200).json({ message: "All Reviews of One Product", result });
    })
    .catch(err => {
        console.log(err)
        return res.status(400).json({ message: "Error in getting data", error: err });
    });
};

export const findRatingForParticularProduct = (req,res,next)=>{
    const {userId,productId} = req.body;
    Review.findAll({where:{userId,productId}}).then(result=>{
        if(result)
        return res.status(200).json({ message: "Product find", result });
        return res.status(400).json({ message: "Product did not find", error: err });
    }).catch(err=>{
        return res.status(400).json({ message: "Product did not find", error: err });
    });
}

export const getproductbyrating = async (req, res, next) => {
    try {
        const rating = req.body.rating;
        const productsWithRating = await Review.findAll({
            where: { rating: rating },
            include: [{ model: product, attributes: ['id', 'title', 'description', 'price', 'discountPercentage', 'stock', 'brand', 'rating', 'categoryName', 'thumbnail', 'images'] }],
            attributes: [] // Exclude review attributes
        });

        // Extract products from productsWithRating array
        const transformedProducts = productsWithRating.map(productItem => productItem.product);

        return res.status(200).json({ products: transformedProducts });
    } catch (error) {
        console.error('Error fetching products with rating 4:', error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}
