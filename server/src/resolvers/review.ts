import { Merchant } from "../entities/Merchant";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import { FieldResolver, Resolver, Root } from "type-graphql";

@Resolver(Review)
export default class ReviewResolver {
  @FieldResolver(() => User)
  user(@Root() review: Review): Promise<User | undefined> {
    return User.findOne(review.userId);
  }

  @FieldResolver(() => Merchant)
  merchant(@Root() review: Review): Promise<Merchant | undefined> {
    return Merchant.findOne(review.merchantId);
  }
}
