import { buildSchema } from "type-graphql";
import UserResolver from "./user";
import MerchantResolver from "./merchant";
import ReviewResolver from "./review";
import TagResolver from "./tag";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, MerchantResolver, ReviewResolver, TagResolver],
    validate: false,
  });
