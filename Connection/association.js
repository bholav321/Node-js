
import { Order } from "../model/order.model.js";
import { orderItem } from "../model/orderItem.model.js";




export const OrderItem = Order.hasMany(orderItem, { foreignKey: 'orderId' });