import argon2 from "argon2";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";
import { COOKIE_NAME } from "../constants";
import { Merchant } from "../entities/Merchant";
import { MyContext } from "../types";

const EMAIL_REGEX = /^[\w\.]+@[\w\.]+$/;
const USERNAME_REGEX = /^[\w\.]+$/;
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
  @Query(() => [Merchant])
  merchants(): Promise<Merchant[]> {
    return Merchant.find();
  }

  @Query(() => Merchant, { nullable: true })
  merchant(@Arg("id", () => Int) id: number): Promise<Merchant | undefined> {
    return Merchant.findOne(id);
  }

  @Query(() => Merchant, { nullable: true })
  async mem(@Ctx() { req }: MyContext): Promise<Merchant | undefined> {
    if (req.session.merchantId) {
      return Merchant.findOne(req.session.merchantId);
    }
    return undefined;
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

    req.session.mercahntId = newMerchant.id.toString();

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

    req.session.userId = merchant.id.toString();

    return {
      merchant,
    };
  }

  @Mutation(() => Boolean)
  logoutm(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie(COOKIE_NAME);
        if (err) resolve(false);

        resolve(true);
      })
    );
  }
}
