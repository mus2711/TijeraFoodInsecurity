import argon2 from "argon2";
import { Review } from "../entities/Review";
import { User } from "../entities/User";
import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Float,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import {
  COOKIE_NAME,
  EMAIL_REGEX,
  MERCHANT_IMAGES_PATH,
  MERCHANT_LOGOS_PATH,
  USERNAME_REGEX,
} from "../constants";
import { Merchant } from "../entities/Merchant";
import { MyContext } from "../types";
import { Tag } from "../entities/Tag";
import { MerchantTag } from "../entities/MerchantTag";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { createWriteStream } from "fs";
import path from "path";

@InputType()
class RegisterMerchantInput {
  @Field()
  cpname!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field()
  email!: string;
}

@InputType()
class LoginMerchantInput {
  @Field()
  usernameOrEmail!: string;

  @Field()
  password!: string;
}

@ObjectType()
class MerchantResponse {
  @Field(() => [FieldMerchantError], { nullable: true })
  errors?: FieldMerchantError[];

  @Field(() => Merchant, { nullable: true })
  merchant?: Merchant;
}

@ObjectType()
class FieldMerchantError {
  @Field(() => String)
  field!: keyof RegisterMerchantInput | keyof LoginMerchantInput;

  @Field()
  merchantmsg!: string;
}

@Resolver(Merchant)
export default class MerchantResolver {
  @FieldResolver(() => Int)
  async reviewCount(@Root() merchant: Merchant): Promise<number> {
    const reviews = await Review.find({ merchantId: merchant.id });
    return reviews.length;
  }

  @FieldResolver(() => Float)
  async averageRating(@Root() merchant: Merchant): Promise<number | null> {
    const reviews = await Review.find({ merchantId: merchant.id });
    const ratingSum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length ? ratingSum / reviews.length : null;
  }

  @Query(() => [Merchant])
  merchants(): Promise<Merchant[]> {
    return Merchant.find();
  }

  @Query(() => Merchant, { nullable: true })
  merchant(@Arg("id", () => Int) id: number): Promise<Merchant | undefined> {
    return Merchant.findOne(id);
  }

  @Query(() => [Review])
  async reviews(
    @Arg("merchantId", () => Int) merchantId: number
  ): Promise<Review[]> {
    return await Review.find({ merchantId: merchantId });
  }

  @Mutation(() => MerchantResponse)
  async registerm(
    @Arg("options") options: RegisterMerchantInput,
    @Ctx() { req }: MyContext
  ): Promise<MerchantResponse> {
    const { username, password, cpname, email } = options;
    const errors: FieldMerchantError[] = [];

    if (username.length < 2)
      errors.push({
        field: "username",
        merchantmsg: "Username should be at least 2 characters",
      });
    if (!USERNAME_REGEX.test(username))
      errors.push({
        field: "username",
        merchantmsg: "Username must only contain A-Z, a-z, 0-9 and _",
      });
    if (!EMAIL_REGEX.test(email))
      errors.push({
        field: "email",
        merchantmsg: "Invalid email",
      });
    if (password.length < 6)
      errors.push({
        field: "password",
        merchantmsg: "Password must be at least 6 characters",
      });

    if (errors.length > 0) {
      return { errors };
    }

    const existingMerchant = await Merchant.findOne({
      username: username.toLowerCase(),
    });

    if (existingMerchant) {
      errors.push({
        field: "username",
        merchantmsg: "Username already taken.",
      });
      return { errors };
    }

    const existingCpname = await Merchant.findOne({
      username: username.toLowerCase(),
    });

    if (existingCpname) {
      errors.push({ field: "cpname", merchantmsg: "Name already taken." });
      return { errors };
    }

    const existingEmail = await Merchant.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      errors.push({ field: "email", merchantmsg: "Email already in use." });
      return { errors };
    }

    const hashedPassword = await argon2.hash(password);
    const newMerchant = await Merchant.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      cpname: cpname,
    }).save();

    req.session.merchantId = newMerchant.id.toString();
    delete req.session.userId;

    return {
      merchant: newMerchant,
    };
  }

  @Mutation(() => MerchantResponse)
  async loginm(
    @Arg("options") options: LoginMerchantInput,
    @Ctx() { req }: MyContext
  ): Promise<MerchantResponse> {
    const { usernameOrEmail, password } = options;
    const errors: FieldMerchantError[] = [];

    const isEmail = usernameOrEmail.includes("@");

    if (isEmail) {
      const email = usernameOrEmail;
      if (!EMAIL_REGEX.test(email))
        errors.push({
          field: "usernameOrEmail",
          merchantmsg: "Invalid email",
        });
    } else {
      const username = usernameOrEmail;
      if (username.length < 2)
        errors.push({
          field: "usernameOrEmail",
          merchantmsg: "Username should be at least 2 characters",
        });
      if (!USERNAME_REGEX.test(username))
        errors.push({
          field: "usernameOrEmail",
          merchantmsg: "Username must only contain A-Z, a-z, 0-9 and _",
        });
    }

    if (password.length < 6)
      errors.push({
        field: "password",
        merchantmsg: "Password must be at least 6 characters",
      });

    if (errors.length > 0) {
      return { errors };
    }

    const merchant = await Merchant.findOne(
      isEmail
        ? { email: usernameOrEmail.toLowerCase() }
        : { username: usernameOrEmail.toLowerCase() }
    );
    if (!merchant) {
      errors.push({
        field: "usernameOrEmail",
        merchantmsg: "Username or email not found",
      });
      return { errors };
    }

    const isValid = await argon2.verify(merchant.password, password);
    if (!isValid)
      return {
        errors: [
          {
            field: "password",
            merchantmsg: "Incorrect password",
          },
        ],
      };

    req.session.merchantId = merchant.id.toString();
    delete req.session.userId;

    return {
      merchant,
    };
  }

  @Mutation(() => Boolean)
  logoutm(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) resolve(false);

        resolve(true);
      })
    );
  }

  @Mutation(() => Boolean)
  async addMerchantImage(
    @Ctx() { req }: MyContext,
    @Arg("image", () => GraphQLUpload)
    { createReadStream }: FileUpload
  ): Promise<Boolean> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not Logged in");
    const merchant = await Merchant.findOne(merchantId);
    if (!merchant) throw new Error("Merchant not found");

    const imageUrl = path.join(__dirname, MERCHANT_IMAGES_PATH, merchantId);

    return await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(imageUrl))
        .on("finish", async () => {
          merchant.imageUrl = imageUrl;
          merchant.imageAlt = merchant.cpname;
          await merchant.save();
          resolve(true);
        })
        .on("error", reject)
    );
  }

  @Mutation(() => Boolean)
  async addMerchantLogo(
    @Ctx() { req }: MyContext,
    @Arg("image", () => GraphQLUpload)
    { createReadStream }: FileUpload
  ): Promise<Boolean> {
    const merchantId = req.session.merchantId;
    if (!merchantId) throw new Error("Merchant not Logged in");
    const merchant = await Merchant.findOne(merchantId);
    if (!merchant) throw new Error("Merchant not found");

    const imageUrl = path.join(__dirname, MERCHANT_LOGOS_PATH, merchantId);

    return await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(imageUrl))
        .on("finish", async () => {
          merchant.cplogo = imageUrl;
          await merchant.save();
          resolve(true);
        })
        .on("error", reject)
    );
  }

  @Mutation(() => Merchant)
  async addLocation(
    @Ctx() { req }: MyContext,
    @Arg("location", () => String) location: string
  ): Promise<Merchant> {
    if (!req.session.merchantId) throw new Error("Merchant not Logged in");
    const merchant = await Merchant.findOne(req.session.merchantId);
    if (!merchant) throw new Error("Merchant not found");

    merchant.location = location;
    return await merchant.save();
  }

  @Mutation(() => Merchant)
  async changeCpname(
    @Ctx() { req }: MyContext,
    @Arg("cpname", () => String) cpname: string
  ): Promise<Merchant> {
    if (!req.session.merchantId) throw new Error("Merchant not Logged in");
    const merchant = await Merchant.findOne(req.session.merchantId);
    if (!merchant) throw new Error("Merchant not found");

    merchant.cpname = cpname;
    return await merchant.save();
  }

  @Mutation(() => Review)
  async addReview(
    @Arg("merchantId", () => Int) merchantId: number,
    @Arg("comment", () => String) comment: string,
    @Arg("rating", () => Int) rating: number,
    @Ctx() { req }: MyContext
  ): Promise<Review> {
    const userId = req.session.userId;
    if (!userId) throw new Error("User not logged in.");

    const merchant = await Merchant.findOne(merchantId);
    if (!merchant) throw new Error("Merchant does not exist.");

    const user = await User.findOne(userId);
    if (!user) throw new Error("User not found.");

    return await Review.create({
      userId: parseInt(userId),
      merchantId: merchantId,
      comment: comment,
      rating: rating,
    }).save();
  }

  @Mutation(() => Boolean)
  async deleteReview(
    @Arg("userId", () => Int) userId: number,
    @Arg("merchantId", () => Int) merchantId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const currentUserId = req.session.userId;
    if (!currentUserId) throw new Error("User not logged in");

    if (parseInt(currentUserId) != userId) throw new Error("Incorrect user");

    const review = await Review.findOne({
      userId: userId,
      merchantId: merchantId,
    });
    if (!review) return false;

    await review!.remove();
    return true;
  }

  // Returns all MerchantTag entries in db
  @Query(() => [MerchantTag])
  async allMerchantTags() {
    return await MerchantTag.find();
  }

  // Adds tag to merchant
  @Mutation(() => Boolean)
  async addMerchantTag(
    @Arg("tagId", () => Int) tagId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const currentMerchantId = req.session.merchantId;
    if (!currentMerchantId) throw new Error("Merchant not logged in.");

    const tag = await Tag.findOne(tagId);
    if (!tag) throw new Error("Tag not found.");

    await MerchantTag.create({
      merchantId: parseInt(currentMerchantId),
      tagId: tagId,
    }).save();
    return true;
  }

  // Removes tag from merchant
  @Mutation(() => Boolean)
  async removeMerchantTag(
    @Arg("tagId", () => Int) tagId: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    const currentMerchantId = req.session.merchantId;
    if (!currentMerchantId) throw new Error("Merchant not logged in.");

    const tag = await Tag.findOne(tagId);
    if (!tag) throw new Error("Tag not found.");

    const merchantTag = await MerchantTag.findOne({
      merchantId: parseInt(currentMerchantId),
      tagId: tagId,
    });

    if (!merchantTag) throw new Error("Merchant does not have this tag.");

    await MerchantTag.delete(merchantTag);
    return true;
  }

  // Returns tags for a given merchant
  @Query(() => [Tag])
  async merchantTags(
    @Arg("merchantId", () => Int) merchantId: number
  ): Promise<Tag[]> {
    const merchantTags = await MerchantTag.find({
      merchantId: merchantId,
    });

    let tags: Tag[] = [];
    for (const mt of merchantTags) {
      const tag = await Tag.findOne({ id: mt.tagId });
      if (tag) {
        tags.push(tag);
      }
    }

    return tags;
  }
}
