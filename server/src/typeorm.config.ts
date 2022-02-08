import { ConnectionOptions } from "typeorm";
import { __prod__ } from "./constants";
import { User } from "./entities/User";
import { Merchant } from "./entities/Merchant";
import { Review } from "./entities/Review";
import { Tag } from "./entities/Tag";
import { MerchantTag } from "./entities/MerchantTag";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { FoodItem } from "./entities/FoodItem";

export const typeormConfig = (
  dbName: string,
  reset: boolean = false
): ConnectionOptions => ({
  type: "postgres" as const,
  database: dbName,
  username: "postgres",
  password: "postgres",
  // synchronize: !__prod__,
  synchronize: true,
  dropSchema: reset,
  entities: [
    User,
    Merchant,
    Review,
    Tag,
    MerchantTag,
    Order,
    OrderItem,
    FoodItem,
  ],
  logging: !__prod__,
});
