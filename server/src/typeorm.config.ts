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
import { Video } from "./entities/Video";
import { UserVideo } from "./entities/UserVideo";

export const typeormConfig = (
  dbName: string,
  reset: boolean = false
): ConnectionOptions => ({
  type: "postgres" as const,
  database: dbName,
  username: "postgres",
  password: "postgres",
  synchronize: false,
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
    Video,
    UserVideo,
  ],
  logging: !__prod__,
});
