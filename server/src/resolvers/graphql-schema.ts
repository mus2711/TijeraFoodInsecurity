import { buildSchema } from "type-graphql";
import UserResolver from "./user";
import MerchantResolver from "./merchant";
import ReviewResolver from "./review";
import TagResolver from "./tag";
import OrderResolver from "./order";
import FoodItemResolver from "./fooditem";
import OrderItemResolver from "./orderItem";
import VideoResolver from "./video";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      UserResolver,
      MerchantResolver,
      ReviewResolver,
      TagResolver,
      OrderResolver,
      FoodItemResolver,
      OrderItemResolver,
      VideoResolver,
    ],
    validate: false,
  });
