import DeliveryBoy from "../module/deliveryBoy.module.js";

export const signUp = (req,res,next)=>{
    // let id = req.body.id;
    let email = req.body.email;
    let password = req.body.password;
    let contact = req.body.contact;
    let object = new DeliveryBoy(null,email,password,contact);
    object.signUp().then(result=>{
        console.log("Account created..")
        res.status(200).json({message:"Account created successfully.."})
    }).catch(err=>{
        console.log(err)
        res.status(401).json({message:"Internal server error..."})
    });
}

export const signIn = (req,res,next)=>{
    let email = req.body.email;
    let password = req.body.password;
    let object = new DeliveryBoy(null,email,password,null);
    object.signIn().then(result=>{
        console.log("Sign in success..")
        res.status(200).json({message:"Sign in successfully..."})
    }).catch(err=>{
        console.log(err)
        res.status(401).json({message:"Internal server error..."})
    });
}