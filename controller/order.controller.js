import { raw } from "mysql2";
import Cart from "../model/Cart.model.js";
import { cartItem } from "../model/cartItem.model.js";
import { Order } from "../model/order.model.js";
import { orderItem } from "../model/orderItem.model.js";
import { product } from "../model/product.model.js";
import { where } from "sequelize";
import { User } from "../model/user.model.js";

export const placedOrder = async (req, res, next) => {
    try {
        const date = new Date();
        const currentDate = date.toString().split("GM")[0];

        const { userId, orderID, firstName, lastName, contact, address, city, pinCode, status } = req.body;

        // Find the cart for the given userId
        const cartResult = await Cart.findOne({ where: { userId: userId } });
        const cartId = cartResult.dataValues.id;

        // Find all cart items associated with the cartId
        const cartItemResult = await cartItem.findAll({ where: { cartId: cartId }, raw: true });
                                await cartItem.destroy({where:{cartId:cartId}});
        // Create order and order items for each cart item
        for (let i = 0; i < cartItemResult.length; i++) {
            const productId = cartItemResult[i].productId;
            const quantity = cartItemResult[i].quantity;

            // Create order
            const order = await Order.create({
                orderId: orderID,
                orderDate: currentDate,
                firstName,
                lastName,
                contact,
                address,
                pinCode,
                city,
                status,
                userId
            });

            const orderId = order.id;

            // Create order item
            await orderItem.create({
                productId: productId,
                quantity: quantity,
                orderId: orderId
            });
        }

        return res.status(200).json({ message: "Order placed successfully..." });
    } catch (error) {
        console.error("Error placing order:", error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


export const buyNow = async (req, res, next) => {
    let date = new Date();
    let currentDate = date.toString().split("GM")[0];
    let { userId, orderID, firstName, lastName, contact, address,productId, city, pinCode, status } = req.body;
        await Order.create({
            orderId:orderID, orderDate: currentDate, firstName, lastName, contact, address, pinCode, city, status, userId
        });
        let getId = await Order.findAll({ where: { OrderDate: currentDate }, raw: true });
        getId = getId[0].id;
        const orderItemRes = await orderItem.create({
            productId: productId,
            quantity: 1,
            orderId: getId
        })
    if (orderItemRes)
        return res.status(200).json({ message: "Order placed successfully..." })
    return res.status(401).json({ message: "Something went wrong" })
}

export const viewAllOrderList = (req, res, next) => {
    Order.findAll({
        include: [
            {
                model: orderItem, // Corrected reference to OrderItem model
                include: {
                    model: product // Corrected reference to Product model
                }
            }
        ],

    }).then(result => {
        return res.status(200).json({ message: "Your orders ", result })
    }).catch(err => {
        console.log(err)
        return res.status(400).json({ message: "Internal server error ", err })
    });
}

export const viewParticularUserOrder = (req, res, next) => {
    let { userId } = req.body;
    console.log(userId)
    Order.findAll({
        where:{userId:userId},
        include: [
            {
                model: orderItem, // Corrected reference to OrderItem model
                include: {
                    model: product // Corrected reference to Product model
                }
            }
        ],

    }).then(result => {
        return res.status(200).json({ message: "Your orders ", result })
    }).catch(err => {
        console.log(err)
        return res.status(400).json({ message: "Internal server error ", err })
    });
}


