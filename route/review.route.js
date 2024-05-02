import express from 'express'
import { addreview, findRatingForParticularProduct, viewAllReviewOnParticularProduct } from '../controller/review.controller.js';

const route = express.Router();

route.post('/addreview',addreview);
route.get("/viewallreview/:productId",viewAllReviewOnParticularProduct)
route.post("/findRatingForProduct",findRatingForParticularProduct)
export default route