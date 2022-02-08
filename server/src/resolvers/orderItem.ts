import { Order } from "../entities/Order";
import { OrderItem } from "../entities/OrderItem";
import { FieldResolver, Resolver, Root } from "type-graphql";
import { FoodItem } from "../entities/FoodItem";

@Resolver(OrderItem)
export default class OrderItemResolver {
  @FieldResolver(() => Order)
  order(@Root() orderItem: OrderItem): Promise<Order | undefined> {
    return Order.findOne(orderItem.orderId);
  }

  @FieldResolver(() => FoodItem)
  foodItem(@Root() orderItem: OrderItem): Promise<FoodItem | undefined> {
    return FoodItem.findOne(orderItem.foodItemId);
  }
}
