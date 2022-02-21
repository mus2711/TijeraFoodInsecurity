import argon2 from "argon2";
import { Merchant } from "../entities/Merchant";
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
import { COOKIE_NAME, EMAIL_REGEX, USERNAME_REGEX } from "../constants";
import { User } from "../entities/User";
import { MyContext } from "../types";

@InputType()
class RegisterInput {
  @Field()
  email!: string;

  @Field()
  username!: string;

  @Field()
  password!: string;

  @Field()
  firstname!: string;

  @Field()
  lastname!: string;
}

@InputType()
class LoginInput {
  @Field()
  usernameOrEmail!: string;

  @Field()
  password!: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@ObjectType()
class MeResponse {
  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => Merchant, { nullable: true })
  merchant?: Merchant;
}

@ObjectType()
class FieldError {
  @Field(() => String)
  field!: keyof RegisterInput | keyof LoginInput;

  @Field()
  message!: string;
}

function calculateMaxTokens(dependents: number, income: number): number {
  return (
    Math.floor(Math.max(0, 50000 - income) / 500) *
    Math.ceil(Math.max(1, dependents) / 2)
  );
}

@Resolver(User)
export default class UserResolver {
  @Query(() => [User])
  users(): Promise<User[]> {
    return User.find();
  }

  @Query(() => User, { nullable: true })
  user(@Arg("id", () => Int) id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  @Query(() => MeResponse)
  async me(@Ctx() { req }: MyContext): Promise<MeResponse> {
    const response = new MeResponse();
    if (req.session.userId) {
      response.user = await User.findOne(req.session.userId);
    }
    if (req.session.merchantId) {
      response.merchant = await Merchant.findOne(req.session.merchantId);
    }
    return response;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: RegisterInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { username, email, password, firstname, lastname } = options;
    const errors: FieldError[] = [];

    if (username.length < 2)
      errors.push({
        field: "username",
        message: "Username should be at least 2 characters",
      });
    if (!USERNAME_REGEX.test(username))
      errors.push({
        field: "username",
        message: "Username must only contain A-Z, a-z, 0-9 and _",
      });
    if (!EMAIL_REGEX.test(email))
      errors.push({
        field: "email",
        message: "Invalid email",
      });
    if (password.length < 6)
      errors.push({
        field: "password",
        message: "Password must be at least 6 characters",
      });

    if (errors.length > 0) {
      return { errors };
    }

    const existingUser = await User.findOne({
      username: username.toLowerCase(),
    });

    if (existingUser) {
      errors.push({ field: "username", message: "Username already taken." });
      return { errors };
    }

    const existingEmail = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingEmail) {
      errors.push({ field: "email", message: "Email already in use." });
      return { errors };
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: hashedPassword,
      firstname: firstname,
      lastname: lastname,
    }).save();

    req.session.userId = newUser.id.toString();
    delete req.session.merchantId;

    return {
      user: newUser,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const { usernameOrEmail, password } = options;
    const errors: FieldError[] = [];

    const isEmail = usernameOrEmail.includes("@");

    if (isEmail) {
      const email = usernameOrEmail;
      if (!EMAIL_REGEX.test(email))
        errors.push({
          field: "usernameOrEmail",
          message: "Invalid email",
        });
    } else {
      const username = usernameOrEmail;
      if (username.length < 2)
        errors.push({
          field: "usernameOrEmail",
          message: "Username should be at least 2 characters",
        });
      if (!USERNAME_REGEX.test(username))
        errors.push({
          field: "usernameOrEmail",
          message: "Username must only contain A-Z, a-z, 0-9 and _",
        });
    }

    if (password.length < 6)
      errors.push({
        field: "password",
        message: "Password must be at least 6 characters",
      });

    if (errors.length > 0) {
      return { errors };
    }

    const user = await User.findOne(
      isEmail
        ? { email: usernameOrEmail.toLowerCase() }
        : { username: usernameOrEmail.toLowerCase() }
    );
    if (!user) {
      errors.push({
        field: "usernameOrEmail",
        message: "Username or email not found",
      });
      return { errors };
    }

    const isValid = await argon2.verify(user.password, password);
    if (!isValid)
      return {
        errors: [
          {
            field: "password",
            message: "Incorrect password",
          },
        ],
      };

    req.session.userId = user.id.toString();
    delete req.session.merchantId;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext): Promise<boolean> {
    return new Promise((resolve) =>
      req.session.destroy((err: any) => {
        res.clearCookie(COOKIE_NAME);
        if (err) resolve(false);

        resolve(true);
      })
    );
  }

  // Functions to change user's properties:

  @Mutation(() => User)
  async changeFirstname(
    @Arg("firstname", () => String) firstname: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.firstname = firstname;
    return await user.save();
  }

  @Mutation(() => User)
  async changeLastName(
    @Arg("lastname", () => String) lastname: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.lastname = lastname;
    return await user.save();
  }

  @Mutation(() => User)
  async changeIncome(
    @Arg("income", () => Int) income: number,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.income = income;
    return await user.save();
  }

  @Mutation(() => User)
  async changeDependents(
    @Arg("dependents", () => Int) dependents: number,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.dependents = dependents;
    return await user.save();
  }

  @Mutation(() => User)
  async changeDOB(
    @Arg("day", () => Int) day: number,
    @Arg("month", () => Int) month: number,
    @Arg("year", () => Int) year: number,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.dob = new Date(year, month, day);
    return await user.save();
  }

  @Mutation(() => User)
  async changeCountry(
    @Arg("country", () => String) country: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.country = country;
    return await user.save();
  }

  @Mutation(() => User)
  async changeGender(
    @Arg("gender", () => String) gender: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.gender = gender;
    return await user.save();
  }

  @Mutation(() => User)
  async changePhoneNumber(
    @Arg("phoneNumber", () => String) phoneNumber: string,
    @Ctx() { req }: MyContext
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.phoneNumber = phoneNumber;
    return await user.save();
  }

  // Calculates user's max tokens using income and dependents
  @Mutation(() => User)
  async initialiseUserTokens(@Ctx() { req }: MyContext) {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    if (user.dependents == null) throw new Error("User dependents not found");
    if (user.income == null) throw new Error("User income not found");

    const tokens = calculateMaxTokens(user.dependents, user.income);
    user.maxTokens = tokens;
    user.currentTokens = tokens;
    return await user.save();
  }

  // Manually updates user's max tokens
  @Mutation(() => User)
  async changeUserMaxTokens(
    @Ctx() { req }: MyContext,
    @Arg("maxTokens", () => Int) maxTokens: number
  ) {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    user.maxTokens = maxTokens;
    return await user.save();
  }

  @Mutation(() => User)
  async addTokens(
    @Ctx() { req }: MyContext,
    @Arg("tokens", () => Int) tokens: number
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    if (user.currentTokens == null || user.maxTokens == null) {
      throw new Error("User tokens not initialised.");
    }

    user.currentTokens = Math.min(user.currentTokens + tokens, user.maxTokens);
    return await user.save();
  }

  @Mutation(() => User)
  async removeTokens(
    @Ctx() { req }: MyContext,
    @Arg("tokens", () => Int) tokens: number
  ): Promise<User> {
    if (!req.session.userId) throw new Error("User not logged in");
    const user = await User.findOne(req.session.userId);
    if (!user) throw new Error("User not found");

    if (user.currentTokens == null || user.maxTokens == null) {
      throw new Error("User tokens not initialised.");
    }

    if (user.currentTokens - tokens < 0) throw new Error("Insufficient tokens");

    user.currentTokens -= tokens;
    return await user.save();
  }
}
