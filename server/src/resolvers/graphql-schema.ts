import { buildSchema } from "type-graphql";
// import CommentResolver from "./comment";
// import PostResolver from "./post";
import UserResolver from "./user";
import MerchantResolver from "./merchant";

export const createSchema = () =>
  buildSchema({
    resolvers: [UserResolver, MerchantResolver],
    validate: false,
  });
