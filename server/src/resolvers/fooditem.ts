import { FoodItem } from "../entities/FoodItem";
import {
  Arg,
  Ctx,
  FieldResolver,
  Float,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Merchant } from "../entities/Merchant";
import { OrderItem } from "../entities/OrderItem";
import { MyContext } from "../types";
import { Order } from "../entities/Order";

@Resolver(FoodItem)
export default class FoodItemResolver {
  @FieldResolver(() => Merchant)
  merchant(@Root() foodItem: FoodItem): Promise<Merchant | undefined> {
    return Merchant.findOne(foodItem.merchantId);
  }

  // Gets all food items in db
  @Query(() => [FoodItem])
  async foodItems(): Promise<FoodItem[]> {
    return FoodItem.find();
  }

  // Gets all food items for a specific merchant
  @Query(() => [FoodItem])
  async getMenu(
    @Arg("merchantId", () => Int) merchantId: number
  ): Promise<FoodItem[]> {
    return FoodItem.find({ merchantId: merchantId });
  }

  // Creates food item for merchant
  @Mutation(() => FoodItem)
  async createFoodItem(
    @Ctx() { req }: MyContext,
    @Arg("itemName", () => String) itemName: string,
    @Arg("imageUrl", () => String) imageUrl: string,
    @Arg("imageAlt", () => String) imageAlt: string,
    @Arg("cost", () => Float) cost: number,
    @Arg("description", () => String) description: string,
    @Arg("stock", () => Int) stock: number
  ): Promise<FoodItem> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    return await FoodItem.create({
      itemName: itemName,
      imageUrl: imageUrl,
      imageAlt: imageAlt,
      cost: cost,
      description: description,
      stock: stock,
      merchantId: parseInt(merchantId),
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteFoodItem(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number
  ) {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found");

    if (parseInt(merchantId) != foodItem.merchantId) {
      throw new Error("Food item does not belong to current merchant.");
    }

    await foodItem!.remove();
    return true;
  }

  // Mutations for merchant to edit food item

  @Mutation(() => FoodItem)
  async changeFoodItemName(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number,
    @Arg("itemName", () => String) itemName: string
  ): Promise<FoodItem> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found");

    if (foodItem.merchantId != parseInt(merchantId)) {
      throw new Error("Food item does not belong to current merchant.");
    }

    foodItem.itemName = itemName;
    return await foodItem.save();
  }

  @Mutation(() => FoodItem)
  async changeFoodImageUrl(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number,
    @Arg("imageUrl", () => String) imageUrl: string
  ): Promise<FoodItem> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found");

    if (foodItem.merchantId != parseInt(merchantId)) {
      throw new Error("Food item does not belong to current merchant.");
    }

    foodItem.imageUrl = imageUrl;
    return await foodItem.save();
  }

  @Mutation(() => FoodItem)
  async changeFoodImageAlt(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number,
    @Arg("imageAlt", () => String) imageAlt: string
  ): Promise<FoodItem> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found");

    if (foodItem.merchantId != parseInt(merchantId)) {
      throw new Error("Food item does not belong to current merchant.");
    }

    foodItem.imageAlt = imageAlt;
    return await foodItem.save();
  }

  @Mutation(() => FoodItem)
  async changeFoodCost(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number,
    @Arg("cost", () => Float) cost: number
  ): Promise<FoodItem> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found");

    if (foodItem.merchantId != parseInt(merchantId)) {
      throw new Error("Food item does not belong to current merchant.");
    }

    foodItem.cost = cost;
    return await foodItem.save();
  }

  @Mutation(() => FoodItem)
  async changeFoodDescription(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number,
    @Arg("description", () => String) description: string
  ): Promise<FoodItem> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found");

    if (foodItem.merchantId != parseInt(merchantId)) {
      throw new Error("Food item does not belong to current merchant.");
    }

    foodItem.description = description;
    return await foodItem.save();
  }

  @Mutation(() => FoodItem)
  async changeFoodStock(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number,
    @Arg("stock", () => Float) stock: number
  ): Promise<FoodItem> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found");

    if (foodItem.merchantId != parseInt(merchantId)) {
      throw new Error("Food item does not belong to current merchant.");
    }

    foodItem.stock = stock;
    return await foodItem.save();
  }

  // Adds (1) food item to user's current order
  @Mutation(() => OrderItem)
  async addToOrder(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number
  ): Promise<OrderItem> {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found.");

    if (foodItem.stock <= 0) throw new Error("Food item out of stock.");

    let order = await Order.findOne({
      userId: parseInt(userId),
      isComplete: false,
    });
    if (!order) {
      order = await Order.create({
        userId: parseInt(userId),
        merchantId: foodItem.merchantId,
        isComplete: false,
      }).save();
    }

    foodItem.stock -= 1;
    await foodItem.save();

    const orderItem = await OrderItem.findOne({
      orderId: order.id,
      foodItemId: foodItem.id,
    });

    if (!orderItem) {
      return await OrderItem.create({
        orderId: order.id,
        foodItemId: foodItem.id,
        quantity: 1,
      }).save();
    } else {
      orderItem.quantity += 1;
      return await orderItem.save();
    }
  }

  // Removes (1) food item from user's current order
  @Mutation(() => Boolean)
  async removeFromOrder(
    @Ctx() { req }: MyContext,
    @Arg("foodItemId", () => Int) foodItemId: number
  ): Promise<Boolean> {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in.");

    const foodItem = await FoodItem.findOne({ id: foodItemId });
    if (!foodItem) throw new Error("Food item not found.");

    let order = await Order.findOne({
      userId: parseInt(userId),
      isComplete: false,
    });

    if (!order) throw new Error("User has no current order.");

    const orderItem = await OrderItem.findOne({
      orderId: order.id,
      foodItemId: foodItem.id,
    });

    if (!orderItem) return false;

    foodItem.stock += 1;
    await foodItem.save();

    if (orderItem.quantity > 1) {
      orderItem.quantity -= 1;
      await orderItem.save();
      return true;
    }

    await orderItem!.remove();

    return true;
  }
}
