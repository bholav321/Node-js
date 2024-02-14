import { getOrder } from "../controller/delivery.controller.js";
import express from "express"
let route = express.Router();

route.use("/getOrder",getOrder)

export default route;