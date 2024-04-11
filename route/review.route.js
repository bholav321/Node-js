import express from 'express'
import { addreview, viewAllReviewOnParticualrProduct } from '../controller/review.controller.js';

const route = express.Router();

route.post('/addreview',addreview);
route.get("/viewallreview",viewAllReviewOnParticualrProduct)

export default route