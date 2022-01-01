import { buildSchema } from "type-graphql";
import UserResolver from "./user";
import MerchantResolver from "./merchant";
import ReviewResolver from "./review";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, MerchantResolver, ReviewResolver],
    validate: false,
  });
