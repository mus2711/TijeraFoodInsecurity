import { Order } from "../entities/Order";
import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Merchant } from "../entities/Merchant";
import { OrderItem } from "../entities/OrderItem";
import { MyContext } from "src/types";
import { FoodItem } from "../entities/FoodItem";

@ObjectType()
class OrderResponse {
  @Field(() => Order, { nullable: true })
  order?: Order;

  @Field(() => [OrderItem], { nullable: true })
  orderItems?: OrderItem[];
}

@Resolver(Order)
export default class OrderResolver {
  @FieldResolver(() => User)
  user(@Root() order: Order): Promise<User | undefined> {
    return User.findOne(order.userId);
  }

  @FieldResolver(() => Merchant)
  merchant(@Root() order: Order): Promise<Merchant | undefined> {
    return Merchant.findOne(order.merchantId);
  }

  @FieldResolver(() => Float)
  async cost(@Root() order: Order): Promise<number> {
    const orderItems = await OrderItem.find({ orderId: order.id });
    var cost = 0;
    for (const orderItem of orderItems) {
      const foodItem = await FoodItem.findOne({ id: orderItem.foodItemId });
      cost += foodItem!.cost * orderItem.quantity;
    }
    return cost;
  }

  // Returns all orders for a given user
  @Query(() => [OrderResponse])
  async userOrders(
    @Arg("userId", () => Int) userId: number
  ): Promise<OrderResponse[]> {
    const orderResponses = [];
    const orders = await Order.find({ userId: userId });
    for (const order of orders) {
      const response = new OrderResponse();
      response.order = order;
      response.orderItems = await OrderItem.find({ orderId: order.id });
      orderResponses.push(response);
    }
    return orderResponses;
  }

  // Returns current order in progress for a given user
  @Query(() => OrderResponse)
  async userCurrentOrder(
    @Arg("userId", () => Int) userId: number
  ): Promise<OrderResponse | undefined> {
    const response = new OrderResponse();
    const order = await Order.findOne({ userId: userId, isComplete: false });
    if (!order) throw new Error("No current order found.");
    response.order = order;
    response.orderItems = await OrderItem.find({ orderId: order.id });
    return response;
  }

  // Returns all orders for currently logged in merchant
  @Query(() => [OrderResponse])
  async merchantOrders(@Ctx() { req }: MyContext): Promise<OrderResponse[]> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const orderResponses = [];
    const orders = await Order.find({ merchantId: parseInt(merchantId) });
    for (const order of orders) {
      const response = new OrderResponse();
      response.order = order;
      response.orderItems = await OrderItem.find({ orderId: order.id });
      orderResponses.push(response);
    }
    return orderResponses;
  }

  // Returns all ongoing orders for currently logged in merchant
  @Query(() => [OrderResponse])
  async merchantCurrentOrders(@Ctx() { req }: MyContext) {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const orderResponses = [];
    const orders = await Order.find({
      merchantId: parseInt(merchantId),
      isComplete: false,
    });

    for (const order of orders) {
      const response = new OrderResponse();
      response.order = order;
      response.orderItems = await OrderItem.find({ orderId: order.id });
      orderResponses.push(response);
    }
    return orderResponses;
  }

  // Deletes user's current order
  @Mutation(() => Boolean)
  async deleteOrder(@Ctx() { req }: MyContext): Promise<Boolean> {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in.");

    const order = await Order.findOne({
      userId: parseInt(userId),
      isComplete: false,
    });
    if (!order) return false;

    // replace stock of each item
    const orderItems = await OrderItem.find({ orderId: order.id });
    for (const orderItem of orderItems) {
      const foodItem = await FoodItem.findOne({ id: orderItem.foodItemId });
      foodItem!.stock += orderItem.quantity;
      await foodItem!.save();
    }

    await order!.remove();
    return true;
  }

  // Mark order as completed
  @Mutation(() => Order)
  async completeOrder(@Ctx() { req }: MyContext): Promise<Order> {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in.");

    const order = await Order.findOne({
      userId: parseInt(userId),
      isComplete: false,
    });
    if (!order) throw new Error("Order does not exist.");

    order.isComplete = true;
    return await order.save();
  }
}
