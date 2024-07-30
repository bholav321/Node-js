import express from 'express';
// import { verifyToken } from '../Varification/auth.js'
import { signUp, userList, signIn, findByEmail,addUsers, removeUser, updatePassword, resetPassword, updateUser} from '../controller/user.controller.js';
import { body } from 'express-validator';
const router = express.Router();
router.post("/signUp", body("email", "Please enter a email").notEmpty(), body("email", "Enter a valid email").isEmail(),
    body("name", "Please enter a name").notEmpty(), body("password", "Password length must be more than 5").isLength({ min: 6 }), signUp);
router.get("/userList", userList);
router.post("/findByEmail", findByEmail)
router.post("/signIn", signIn);
router.delete("/removeUser", removeUser)
router.post("/updatePassword", updatePassword)
router.post("/addUsers",addUsers)
router.post("/resetPassword",resetPassword)
router.post("/updatedetail",updateUser)
export default router;


