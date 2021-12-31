import { buildSchema } from "type-graphql";
import UserResolver from "./user";
import MerchantResolver from "./merchant";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, MerchantResolver],
    validate: false,
  });
