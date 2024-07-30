import ContactUs from "../model/contactus.model.js"
export const addContact = (req, res, next) => {
    ContactUs.create({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            message:req.body.message,
            userId:req.body.userId
        }).then(result => {
            return res.status(200).json({ message: "messsage save successfully...", admin: result })
        }).catch(err => {
            console.log(err)
            return res.status(401).json({ message: "kuchh glt h saveContact Information me..." })
        })
}

export const getContactUsData = (req, res, next) => {
    ContactUs.findAll().then(result => {
            return res.status(200).json({ message: "messsage get successfully...", admin: result })
        }).catch(err => {
            console.log(err)
            return res.status(401).json({ message: "kuchh glt h saveContact Information me..." })
        })
}