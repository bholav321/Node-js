import express from 'express';
import { signUp, signIn, update,show,deleteData} from '../controller/user.controller.js';
import {verify} from "../varification/verify.js";


let route =  express();
route.post("/signUp",signUp);
route.get("/signIn",signIn);
route.post("/update",update)
route.get("/show",verify,show)
route.delete("/delete",deleteData)

export default route;