import express from 'express'
import { addContact, getContactUsData } from '../controller/contactus.controller.js';

const route = express.Router();

route.post('/addContact',addContact);
route.get("/getContactUsData",getContactUsData)

export default route