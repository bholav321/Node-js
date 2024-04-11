import Review from "../model/review.model.js"

export const addreview = (req,res,next)=>{
    Review.create({
        Comment : req.body.Comment,
        rating: req.body.rating,
        userId: req.body.userId,
        productId: req.body.productId
    })
    .then(result=>{
        return res.status(200).json({message:'submit feedback'})
    })
    .catch(err=>{
        return res.status(401).json({error: 'something went wrong'})
    })
}

export const viewAllReviewOnParticualrProduct = (req,res,next)=>{
    let productId = req.body.productId;
    let userId = req.body.userId
    Review.findAll({where:{productId,userId}}).then(result=>{
        return res.status(200).json({message:"All Reivews of One Product ",result})
     }).catch(err=>{
        return res.status(400).json({message:"Error in getting data",err});
     });
}