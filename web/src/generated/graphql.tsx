import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type FieldMerchantError = {
  __typename?: 'FieldMerchantError';
  field: Scalars['String'];
  merchantmsg: Scalars['String'];
};

export type FoodItem = {
  __typename?: 'FoodItem';
  cost: Scalars['Float'];
  createdAt: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['Int'];
  imageAlt?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  itemName: Scalars['String'];
  merchant: Merchant;
  merchantId: Scalars['Float'];
  stock: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type LoginInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type LoginMerchantInput = {
  password: Scalars['String'];
  usernameOrEmail: Scalars['String'];
};

export type MeResponse = {
  __typename?: 'MeResponse';
  merchant?: Maybe<Merchant>;
  user?: Maybe<User>;
};

export type Merchant = {
  __typename?: 'Merchant';
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  averageRating?: Maybe<Scalars['Float']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  cplogo?: Maybe<Scalars['String']>;
  cpname: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  imageAlt?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  postcode?: Maybe<Scalars['String']>;
  reviewCount: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type MerchantResponse = {
  __typename?: 'MerchantResponse';
  errors?: Maybe<Array<FieldMerchantError>>;
  merchant?: Maybe<Merchant>;
};

export type MerchantTag = {
  __typename?: 'MerchantTag';
  createdAt: Scalars['String'];
  merchantId: Scalars['Int'];
  tagId: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addFoodImage: Scalars['Boolean'];
  addMerchantCoordinates: Merchant;
  addMerchantImage: Scalars['Boolean'];
  addMerchantLogo: Scalars['Boolean'];
  addMerchantTag: Scalars['Boolean'];
  addReview: Review;
  addToOrder: OrderItem;
  addTokens: User;
  addUserCoordinates: User;
  addUserImage: Scalars['Boolean'];
  changeCountry: User;
  changeCpname: Merchant;
  changeDOB: User;
  changeDependents: User;
  changeFirstname: User;
  changeFoodCost: FoodItem;
  changeFoodDescription: FoodItem;
  changeFoodItemName: FoodItem;
  changeFoodStock: FoodItem;
  changeGender: User;
  changeIncome: User;
  changeLastName: User;
  changeMerchantAddress: User;
  changePhoneNumber: User;
  changeUserMaxTokens: User;
  completeOrder: Order;
  createFoodItem: Array<FoodItem>;
  createTag: Tag;
  deleteFoodItem: Array<FoodItem>;
  deleteOrder: Scalars['Boolean'];
  deleteReview: Scalars['Boolean'];
  deleteTag: Scalars['Boolean'];
  initialiseUserTokens: User;
  login: UserResponse;
  loginm: MerchantResponse;
  logout: Scalars['Boolean'];
  logoutm: Scalars['Boolean'];
  register: UserResponse;
  registerm: MerchantResponse;
  removeFromOrder: Scalars['Boolean'];
  removeMerchantTag: Scalars['Boolean'];
  removeTokens: User;
};


export type MutationAddFoodImageArgs = {
  foodItemId: Scalars['Int'];
  image: Scalars['Upload'];
};


export type MutationAddMerchantCoordinatesArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


export type MutationAddMerchantImageArgs = {
  image: Scalars['Upload'];
};


export type MutationAddMerchantLogoArgs = {
  image: Scalars['Upload'];
};


export type MutationAddMerchantTagArgs = {
  tagId: Scalars['Int'];
};


export type MutationAddReviewArgs = {
  comment: Scalars['String'];
  merchantId: Scalars['Int'];
  rating: Scalars['Int'];
};


export type MutationAddToOrderArgs = {
  foodItemId: Scalars['Int'];
};


export type MutationAddTokensArgs = {
  tokens: Scalars['Int'];
};


export type MutationAddUserCoordinatesArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


export type MutationAddUserImageArgs = {
  image: Scalars['Upload'];
};


export type MutationChangeCountryArgs = {
  country: Scalars['String'];
};


export type MutationChangeCpnameArgs = {
  cpname: Scalars['String'];
};


export type MutationChangeDobArgs = {
  day: Scalars['Int'];
  month: Scalars['Int'];
  year: Scalars['Int'];
};


export type MutationChangeDependentsArgs = {
  dependents: Scalars['Int'];
};


export type MutationChangeFirstnameArgs = {
  firstname: Scalars['String'];
};


export type MutationChangeFoodCostArgs = {
  cost: Scalars['Float'];
  foodItemId: Scalars['Int'];
};


export type MutationChangeFoodDescriptionArgs = {
  description: Scalars['String'];
  foodItemId: Scalars['Int'];
};


export type MutationChangeFoodItemNameArgs = {
  foodItemId: Scalars['Int'];
  itemName: Scalars['String'];
};


export type MutationChangeFoodStockArgs = {
  foodItemId: Scalars['Int'];
  stock: Scalars['Float'];
};


export type MutationChangeGenderArgs = {
  gender: Scalars['String'];
};


export type MutationChangeIncomeArgs = {
  income: Scalars['Int'];
};


export type MutationChangeLastNameArgs = {
  lastname: Scalars['String'];
};


export type MutationChangeMerchantAddressArgs = {
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  postcode: Scalars['String'];
};


export type MutationChangePhoneNumberArgs = {
  phoneNumber: Scalars['String'];
};


export type MutationChangeUserMaxTokensArgs = {
  maxTokens: Scalars['Int'];
};


export type MutationCreateFoodItemArgs = {
  cost: Scalars['Float'];
  description: Scalars['String'];
  idMerchant: Scalars['Int'];
  itemName: Scalars['String'];
  stock: Scalars['Int'];
};


export type MutationCreateTagArgs = {
  tagName: Scalars['String'];
};


export type MutationDeleteFoodItemArgs = {
  foodItemId: Scalars['Int'];
  idMerchant: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  merchantId: Scalars['Int'];
  userId: Scalars['Int'];
};


export type MutationDeleteTagArgs = {
  tagName: Scalars['String'];
};


export type MutationLoginArgs = {
  options: LoginInput;
};


export type MutationLoginmArgs = {
  options: LoginMerchantInput;
};


export type MutationRegisterArgs = {
  options: RegisterInput;
};


export type MutationRegistermArgs = {
  options: RegisterMerchantInput;
};


export type MutationRemoveFromOrderArgs = {
  foodItemId: Scalars['Int'];
};


export type MutationRemoveMerchantTagArgs = {
  tagId: Scalars['Int'];
};


export type MutationRemoveTokensArgs = {
  tokens: Scalars['Int'];
};

export type Order = {
  __typename?: 'Order';
  cost?: Maybe<Scalars['Float']>;
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isComplete: Scalars['Boolean'];
  merchant: Merchant;
  merchantId: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
  userId: Scalars['Float'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['String'];
  foodItem: FoodItem;
  foodItemId: Scalars['Float'];
  order: Order;
  orderId: Scalars['Float'];
  quantity: Scalars['Float'];
  updatedAt: Scalars['String'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  order?: Maybe<Order>;
  orderItems?: Maybe<Array<OrderItem>>;
};

export type Query = {
  __typename?: 'Query';
  allMerchantTags: Array<MerchantTag>;
  foodItems: Array<FoodItem>;
  getAllMerchantCoords: Array<Array<Scalars['Float']>>;
  getMenu: Array<FoodItem>;
  me: MeResponse;
  merchant?: Maybe<Merchant>;
  merchantCurrentOrders: Array<OrderResponse>;
  merchantOrders: Array<OrderResponse>;
  merchantPersonalMenu: Array<FoodItem>;
  merchantTags: Array<Tag>;
  merchants: Array<Merchant>;
  reviews: Array<Review>;
  tagMerchants: Array<Merchant>;
  tags: Array<Tag>;
  user?: Maybe<User>;
  userCurrentOrder: OrderResponse;
  userOrders: Array<OrderResponse>;
  users: Array<User>;
};


export type QueryGetMenuArgs = {
  merchantId: Scalars['Int'];
};


export type QueryMerchantArgs = {
  id: Scalars['Int'];
};


export type QueryMerchantTagsArgs = {
  merchantId: Scalars['Int'];
};


export type QueryReviewsArgs = {
  merchantId: Scalars['Int'];
};


export type QueryTagMerchantsArgs = {
  tagId: Scalars['Int'];
};


export type QueryUserArgs = {
  id: Scalars['Int'];
};


export type QueryUserCurrentOrderArgs = {
  userId: Scalars['Int'];
};


export type QueryUserOrdersArgs = {
  userId: Scalars['Int'];
};

export type RegisterInput = {
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type RegisterMerchantInput = {
  cpname: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String'];
  createdAt: Scalars['String'];
  merchant: Merchant;
  rating: Scalars['Float'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Tag = {
  __typename?: 'Tag';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  tagName: Scalars['String'];
  updatedAt: Scalars['String'];
};


export type User = {
  __typename?: 'User';
  country?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  currentTokens?: Maybe<Scalars['Float']>;
  dependents?: Maybe<Scalars['Float']>;
  dob?: Maybe<Scalars['DateTime']>;
  email: Scalars['String'];
  firstname: Scalars['String'];
  gender?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  imageAlt?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  income?: Maybe<Scalars['Float']>;
  lastname: Scalars['String'];
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
  maxTokens?: Maybe<Scalars['Float']>;
  phoneNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularMerchantFragment = { __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> };

export type RegularMerchantErrorFragment = { __typename?: 'FieldMerchantError', field: string, merchantmsg: string };

export type RegularMerchantResponseFragment = { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> }> };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> };

export type AddMerchantLogoMutationVariables = Exact<{
  image: Scalars['Upload'];
}>;


export type AddMerchantLogoMutation = { __typename?: 'Mutation', addMerchantLogo: boolean };

export type AddMerchantTagMutationVariables = Exact<{
  tagId: Scalars['Int'];
}>;


export type AddMerchantTagMutation = { __typename?: 'Mutation', addMerchantTag: boolean };

export type AddReviewMutationVariables = Exact<{
  rating: Scalars['Int'];
  merchantId: Scalars['Int'];
  comment: Scalars['String'];
}>;


export type AddReviewMutation = { __typename?: 'Mutation', addReview: { __typename?: 'Review', comment: string, rating: number, user: { __typename?: 'User', username: string }, merchant: { __typename?: 'Merchant', cpname: string } } };

export type AddToOrderMutationVariables = Exact<{
  foodItemId: Scalars['Int'];
}>;


export type AddToOrderMutation = { __typename?: 'Mutation', addToOrder: { __typename?: 'OrderItem', orderId: number, order: { __typename?: 'Order', cost?: Maybe<number>, userId: number, merchantId: number }, foodItem: { __typename?: 'FoodItem', itemName: string } } };

export type AddTokensMutationVariables = Exact<{
  tokens: Scalars['Int'];
}>;


export type AddTokensMutation = { __typename?: 'Mutation', addTokens: { __typename?: 'User', currentTokens?: Maybe<number>, maxTokens?: Maybe<number>, username: string } };

export type AddUserCoordinatesMutationVariables = Exact<{
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
}>;


export type AddUserCoordinatesMutation = { __typename?: 'Mutation', addUserCoordinates: { __typename?: 'User', latitude?: Maybe<number>, longitude?: Maybe<number> } };

export type RegisterUserFinalMutationVariables = Exact<{
  year: Scalars['Int'];
  month: Scalars['Int'];
  day: Scalars['Int'];
  income: Scalars['Int'];
  dependents: Scalars['Int'];
  country: Scalars['String'];
  gender: Scalars['String'];
  phoneNumber: Scalars['String'];
}>;


export type RegisterUserFinalMutation = { __typename?: 'Mutation', changeDOB: { __typename?: 'User', username: string, dob?: Maybe<any> }, changePhoneNumber: { __typename?: 'User', username: string, phoneNumber?: Maybe<string> }, changeGender: { __typename?: 'User', username: string, gender?: Maybe<string> }, changeCountry: { __typename?: 'User', username: string, country?: Maybe<string> }, changeIncome: { __typename?: 'User', username: string, income?: Maybe<number> }, changeDependents: { __typename?: 'User', username: string, dependents?: Maybe<number> } };

export type ChangeFirstnameMutationVariables = Exact<{
  firstname: Scalars['String'];
}>;


export type ChangeFirstnameMutation = { __typename?: 'Mutation', changeFirstname: { __typename?: 'User', firstname: string, lastname: string } };

export type ChangeFoodStockMutationVariables = Exact<{
  stock: Scalars['Float'];
  foodItemId: Scalars['Int'];
}>;


export type ChangeFoodStockMutation = { __typename?: 'Mutation', changeFoodStock: { __typename?: 'FoodItem', itemName: string, stock: number } };

export type ChangeLastNameMutationVariables = Exact<{
  lastname: Scalars['String'];
}>;


export type ChangeLastNameMutation = { __typename?: 'Mutation', changeLastName: { __typename?: 'User', firstname: string, lastname: string } };

export type CompleteOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type CompleteOrderMutation = { __typename?: 'Mutation', completeOrder: { __typename?: 'Order', isComplete: boolean, userId: number, merchantId: number } };

export type CreateFoodItemMutationVariables = Exact<{
  stock: Scalars['Int'];
  cost: Scalars['Float'];
  description: Scalars['String'];
  itemName: Scalars['String'];
  idMerchant: Scalars['Int'];
}>;


export type CreateFoodItemMutation = { __typename?: 'Mutation', createFoodItem: Array<{ __typename?: 'FoodItem', description: string, id: number, itemName: string, merchantId: number, merchant: { __typename?: 'Merchant', cpname: string } }> };

export type DeleteFoodItemMutationVariables = Exact<{
  foodItemId: Scalars['Int'];
  idMerchant: Scalars['Int'];
}>;


export type DeleteFoodItemMutation = { __typename?: 'Mutation', deleteFoodItem: Array<{ __typename?: 'FoodItem', itemName: string, stock: number, description: string, imageAlt?: Maybe<string>, imageUrl?: Maybe<string>, cost: number }> };

export type InitialiseUserTokensMutationVariables = Exact<{ [key: string]: never; }>;


export type InitialiseUserTokensMutation = { __typename?: 'Mutation', initialiseUserTokens: { __typename?: 'User', username: string, currentTokens?: Maybe<number>, maxTokens?: Maybe<number> } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> } };

export type LoginmMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginmMutation = { __typename?: 'Mutation', loginm: { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type LogoutmMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutmMutation = { __typename?: 'Mutation', logoutm: boolean };

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  lastname: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> } };

export type RegistermMutationVariables = Exact<{
  password: Scalars['String'];
  email: Scalars['String'];
  cpname: Scalars['String'];
  username: Scalars['String'];
}>;


export type RegistermMutation = { __typename?: 'Mutation', registerm: { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> }> } };

export type RemoveTokensMutationVariables = Exact<{
  tokens: Scalars['Int'];
}>;


export type RemoveTokensMutation = { __typename?: 'Mutation', removeTokens: { __typename?: 'User', currentTokens?: Maybe<number>, maxTokens?: Maybe<number>, username: string } };

export type TagsandMeQueryVariables = Exact<{
  merchantId: Scalars['Int'];
}>;


export type TagsandMeQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', tagName: string, id: number }>, me: { __typename?: 'MeResponse', merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, cplogo?: Maybe<string>, imageUrl?: Maybe<string>, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number>, username: string }>, user?: Maybe<{ __typename?: 'User', id: number, firstname: string, lastname: string, username: string, email: string }> }, getMenu: Array<{ __typename?: 'FoodItem', itemName: string, id: number, cost: number, description: string, stock: number, imageUrl?: Maybe<string>, imageAlt?: Maybe<string> }>, merchantTags: Array<{ __typename?: 'Tag', tagName: string, id: number }>, merchant?: Maybe<{ __typename?: 'Merchant', cpname: string, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string> }> };

export type GetMenuQueryVariables = Exact<{
  merchantId: Scalars['Int'];
}>;


export type GetMenuQuery = { __typename?: 'Query', getMenu: Array<{ __typename?: 'FoodItem', itemName: string, id: number, cost: number, description: string, stock: number, imageUrl?: Maybe<string>, imageAlt?: Maybe<string> }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeResponse', merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, cplogo?: Maybe<string>, imageUrl?: Maybe<string>, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number>, username: string }>, user?: Maybe<{ __typename?: 'User', id: number, firstname: string, lastname: string, username: string, email: string, currentTokens?: Maybe<number>, maxTokens?: Maybe<number> }> } };

export type MerchantQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type MerchantQuery = { __typename?: 'Query', merchant?: Maybe<{ __typename?: 'Merchant', cpname: string, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string> }> };

export type MerchantCurrentOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchantCurrentOrdersQuery = { __typename?: 'Query', merchantCurrentOrders: Array<{ __typename?: 'OrderResponse', orderItems?: Maybe<Array<{ __typename?: 'OrderItem', orderId: number, foodItemId: number, foodItem: { __typename?: 'FoodItem', itemName: string, cost: number, description: string, id: number, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, merchantId: number } }>>, order?: Maybe<{ __typename?: 'Order', isComplete: boolean, userId: number, id: number, user: { __typename?: 'User', firstname: string, lastname: string } }> }> };

export type MerchantOrdersQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchantOrdersQuery = { __typename?: 'Query', merchantOrders: Array<{ __typename?: 'OrderResponse', orderItems?: Maybe<Array<{ __typename?: 'OrderItem', orderId: number, foodItemId: number, foodItem: { __typename?: 'FoodItem', itemName: string, cost: number, description: string, id: number, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, merchantId: number } }>>, order?: Maybe<{ __typename?: 'Order', createdAt: string, isComplete: boolean, userId: number, id: number, user: { __typename?: 'User', firstname: string, lastname: string } }> }> };

export type MerchantPersonalMenuQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchantPersonalMenuQuery = { __typename?: 'Query', merchantPersonalMenu: Array<{ __typename?: 'FoodItem', itemName: string, description: string, id: number, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cost: number }> };

export type MerchantTagsQueryVariables = Exact<{
  merchantId: Scalars['Int'];
}>;


export type MerchantTagsQuery = { __typename?: 'Query', merchantTags: Array<{ __typename?: 'Tag', tagName: string, id: number }> };

export type MerchantsQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchantsQuery = { __typename?: 'Query', merchants: Array<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number>, latitude?: Maybe<number>, longitude?: Maybe<number> }>, allMerchantTags: Array<{ __typename?: 'MerchantTag', merchantId: number, tagId: number }>, tags: Array<{ __typename?: 'Tag', tagName: string, id: number }>, me: { __typename?: 'MeResponse', merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, cplogo?: Maybe<string>, imageUrl?: Maybe<string>, city?: Maybe<string>, address1?: Maybe<string>, address2?: Maybe<string>, postcode?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number>, username: string, latitude?: Maybe<number>, longitude?: Maybe<number> }> } };

export type ReviewsQueryVariables = Exact<{
  merchantId: Scalars['Int'];
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', comment: string, rating: number, user: { __typename?: 'User', username: string, firstname: string, lastname: string }, merchant: { __typename?: 'Merchant', cpname: string, id: number } }>, me: { __typename?: 'MeResponse', user?: Maybe<{ __typename?: 'User', id: number, firstname: string, lastname: string, username: string, email: string, currentTokens?: Maybe<number>, maxTokens?: Maybe<number> }> } };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', tagName: string }> };

export type UserCurrentOrderQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserCurrentOrderQuery = { __typename?: 'Query', userCurrentOrder: { __typename?: 'OrderResponse', orderItems?: Maybe<Array<{ __typename?: 'OrderItem', orderId: number, foodItemId: number, order: { __typename?: 'Order', merchantId: number }, foodItem: { __typename?: 'FoodItem', stock: number, cost: number, itemName: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, description: string } }>> } };

export type UserOrdersQueryVariables = Exact<{
  userId: Scalars['Int'];
}>;


export type UserOrdersQuery = { __typename?: 'Query', userOrders: Array<{ __typename?: 'OrderResponse', order?: Maybe<{ __typename?: 'Order', merchantId: number, isComplete: boolean, createdAt: string, merchant: { __typename?: 'Merchant', cpname: string } }>, orderItems?: Maybe<Array<{ __typename?: 'OrderItem', createdAt: string, orderId: number, quantity: number, foodItemId: number, foodItem: { __typename?: 'FoodItem', stock: number, cost: number, itemName: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, description: string, createdAt: string } }>> }> };

export type UserReviewsQueryVariables = Exact<{
  merchantId: Scalars['Int'];
  userId: Scalars['Int'];
}>;


export type UserReviewsQuery = { __typename?: 'Query', userOrders: Array<{ __typename?: 'OrderResponse', order?: Maybe<{ __typename?: 'Order', merchantId: number, isComplete: boolean, createdAt: string, merchant: { __typename?: 'Merchant', cpname: string } }>, orderItems?: Maybe<Array<{ __typename?: 'OrderItem', orderId: number, quantity: number, foodItemId: number, foodItem: { __typename?: 'FoodItem', stock: number, cost: number, itemName: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, description: string } }>> }>, reviews: Array<{ __typename?: 'Review', comment: string, rating: number, user: { __typename?: 'User', username: string, firstname: string, lastname: string }, merchant: { __typename?: 'Merchant', cpname: string, id: number } }>, me: { __typename?: 'MeResponse', user?: Maybe<{ __typename?: 'User', id: number, firstname: string, lastname: string, username: string, email: string, currentTokens?: Maybe<number>, maxTokens?: Maybe<number> }> } };

export const RegularMerchantErrorFragmentDoc = gql`
    fragment RegularMerchantError on FieldMerchantError {
  field
  merchantmsg
}
    `;
export const RegularMerchantFragmentDoc = gql`
    fragment RegularMerchant on Merchant {
  id
  cpname
  imageUrl
  imageAlt
  cplogo
  username
  city
  address1
  address2
  postcode
  reviewCount
  averageRating
}
    `;
export const RegularMerchantResponseFragmentDoc = gql`
    fragment RegularMerchantResponse on MerchantResponse {
  errors {
    ...RegularMerchantError
  }
  merchant {
    ...RegularMerchant
  }
}
    ${RegularMerchantErrorFragmentDoc}
${RegularMerchantFragmentDoc}`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
  field
  message
}
    `;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
  id
  username
  firstname
  lastname
  email
}
    `;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
  errors {
    ...RegularError
  }
  user {
    ...RegularUser
  }
}
    ${RegularErrorFragmentDoc}
${RegularUserFragmentDoc}`;
export const AddMerchantLogoDocument = gql`
    mutation AddMerchantLogo($image: Upload!) {
  addMerchantLogo(image: $image)
}
    `;

export function useAddMerchantLogoMutation() {
  return Urql.useMutation<AddMerchantLogoMutation, AddMerchantLogoMutationVariables>(AddMerchantLogoDocument);
};
export const AddMerchantTagDocument = gql`
    mutation AddMerchantTag($tagId: Int!) {
  addMerchantTag(tagId: $tagId)
}
    `;

export function useAddMerchantTagMutation() {
  return Urql.useMutation<AddMerchantTagMutation, AddMerchantTagMutationVariables>(AddMerchantTagDocument);
};
export const AddReviewDocument = gql`
    mutation AddReview($rating: Int!, $merchantId: Int!, $comment: String!) {
  addReview(rating: $rating, merchantId: $merchantId, comment: $comment) {
    user {
      username
    }
    merchant {
      cpname
    }
    comment
    rating
  }
}
    `;

export function useAddReviewMutation() {
  return Urql.useMutation<AddReviewMutation, AddReviewMutationVariables>(AddReviewDocument);
};
export const AddToOrderDocument = gql`
    mutation addToOrder($foodItemId: Int!) {
  addToOrder(foodItemId: $foodItemId) {
    order {
      cost
      userId
      merchantId
    }
    foodItem {
      itemName
    }
    orderId
  }
}
    `;

export function useAddToOrderMutation() {
  return Urql.useMutation<AddToOrderMutation, AddToOrderMutationVariables>(AddToOrderDocument);
};
export const AddTokensDocument = gql`
    mutation addTokens($tokens: Int!) {
  addTokens(tokens: $tokens) {
    currentTokens
    maxTokens
    username
  }
}
    `;

export function useAddTokensMutation() {
  return Urql.useMutation<AddTokensMutation, AddTokensMutationVariables>(AddTokensDocument);
};
export const AddUserCoordinatesDocument = gql`
    mutation addUserCoordinates($latitude: Float!, $longitude: Float!) {
  addUserCoordinates(latitude: $latitude, longitude: $longitude) {
    latitude
    longitude
  }
}
    `;

export function useAddUserCoordinatesMutation() {
  return Urql.useMutation<AddUserCoordinatesMutation, AddUserCoordinatesMutationVariables>(AddUserCoordinatesDocument);
};
export const RegisterUserFinalDocument = gql`
    mutation registerUserFinal($year: Int!, $month: Int!, $day: Int!, $income: Int!, $dependents: Int!, $country: String!, $gender: String!, $phoneNumber: String!) {
  changeDOB(year: $year, month: $month, day: $day) {
    username
    dob
  }
  changePhoneNumber(phoneNumber: $phoneNumber) {
    username
    phoneNumber
  }
  changeGender(gender: $gender) {
    username
    gender
  }
  changeCountry(country: $country) {
    username
    country
  }
  changeIncome(income: $income) {
    username
    income
  }
  changeDependents(dependents: $dependents) {
    username
    dependents
  }
}
    `;

export function useRegisterUserFinalMutation() {
  return Urql.useMutation<RegisterUserFinalMutation, RegisterUserFinalMutationVariables>(RegisterUserFinalDocument);
};
export const ChangeFirstnameDocument = gql`
    mutation changeFirstname($firstname: String!) {
  changeFirstname(firstname: $firstname) {
    firstname
    lastname
  }
}
    `;

export function useChangeFirstnameMutation() {
  return Urql.useMutation<ChangeFirstnameMutation, ChangeFirstnameMutationVariables>(ChangeFirstnameDocument);
};
export const ChangeFoodStockDocument = gql`
    mutation changeFoodStock($stock: Float!, $foodItemId: Int!) {
  changeFoodStock(stock: $stock, foodItemId: $foodItemId) {
    itemName
    stock
  }
}
    `;

export function useChangeFoodStockMutation() {
  return Urql.useMutation<ChangeFoodStockMutation, ChangeFoodStockMutationVariables>(ChangeFoodStockDocument);
};
export const ChangeLastNameDocument = gql`
    mutation changeLastName($lastname: String!) {
  changeLastName(lastname: $lastname) {
    firstname
    lastname
  }
}
    `;

export function useChangeLastNameMutation() {
  return Urql.useMutation<ChangeLastNameMutation, ChangeLastNameMutationVariables>(ChangeLastNameDocument);
};
export const CompleteOrderDocument = gql`
    mutation completeOrder {
  completeOrder {
    isComplete
    userId
    merchantId
  }
}
    `;

export function useCompleteOrderMutation() {
  return Urql.useMutation<CompleteOrderMutation, CompleteOrderMutationVariables>(CompleteOrderDocument);
};
export const CreateFoodItemDocument = gql`
    mutation createFoodItem($stock: Int!, $cost: Float!, $description: String!, $itemName: String!, $idMerchant: Int!) {
  createFoodItem(
    stock: $stock
    cost: $cost
    description: $description
    itemName: $itemName
    idMerchant: $idMerchant
  ) {
    description
    id
    itemName
    merchantId
    merchant {
      cpname
    }
  }
}
    `;

export function useCreateFoodItemMutation() {
  return Urql.useMutation<CreateFoodItemMutation, CreateFoodItemMutationVariables>(CreateFoodItemDocument);
};
export const DeleteFoodItemDocument = gql`
    mutation deleteFoodItem($foodItemId: Int!, $idMerchant: Int!) {
  deleteFoodItem(foodItemId: $foodItemId, idMerchant: $idMerchant) {
    itemName
    stock
    description
    imageAlt
    imageUrl
    cost
  }
}
    `;

export function useDeleteFoodItemMutation() {
  return Urql.useMutation<DeleteFoodItemMutation, DeleteFoodItemMutationVariables>(DeleteFoodItemDocument);
};
export const InitialiseUserTokensDocument = gql`
    mutation initialiseUserTokens {
  initialiseUserTokens {
    username
    currentTokens
    maxTokens
  }
}
    `;

export function useInitialiseUserTokensMutation() {
  return Urql.useMutation<InitialiseUserTokensMutation, InitialiseUserTokensMutationVariables>(InitialiseUserTokensDocument);
};
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(options: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LoginmDocument = gql`
    mutation Loginm($usernameOrEmail: String!, $password: String!) {
  loginm(options: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    ...RegularMerchantResponse
  }
}
    ${RegularMerchantResponseFragmentDoc}`;

export function useLoginmMutation() {
  return Urql.useMutation<LoginmMutation, LoginmMutationVariables>(LoginmDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const LogoutmDocument = gql`
    mutation Logoutm {
  logoutm
}
    `;

export function useLogoutmMutation() {
  return Urql.useMutation<LogoutmMutation, LogoutmMutationVariables>(LogoutmDocument);
};
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!, $email: String!, $firstname: String!, $lastname: String!) {
  register(
    options: {username: $username, password: $password, email: $email, firstname: $firstname, lastname: $lastname}
  ) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const RegistermDocument = gql`
    mutation Registerm($password: String!, $email: String!, $cpname: String!, $username: String!) {
  registerm(
    options: {username: $username, password: $password, email: $email, cpname: $cpname}
  ) {
    ...RegularMerchantResponse
  }
}
    ${RegularMerchantResponseFragmentDoc}`;

export function useRegistermMutation() {
  return Urql.useMutation<RegistermMutation, RegistermMutationVariables>(RegistermDocument);
};
export const RemoveTokensDocument = gql`
    mutation removeTokens($tokens: Int!) {
  removeTokens(tokens: $tokens) {
    currentTokens
    maxTokens
    username
  }
}
    `;

export function useRemoveTokensMutation() {
  return Urql.useMutation<RemoveTokensMutation, RemoveTokensMutationVariables>(RemoveTokensDocument);
};
export const TagsandMeDocument = gql`
    query TagsandMe($merchantId: Int!) {
  tags {
    tagName
    id
  }
  me {
    merchant {
      id
      cpname
      cplogo
      imageUrl
      imageUrl
      city
      address1
      address2
      postcode
      reviewCount
      averageRating
      username
    }
    user {
      id
      firstname
      lastname
      username
      email
    }
  }
  getMenu(merchantId: $merchantId) {
    itemName
    id
    cost
    description
    stock
    imageUrl
    imageAlt
    stock
  }
  merchantTags(merchantId: $merchantId) {
    tagName
    id
  }
  merchant(id: $merchantId) {
    cpname
    city
    address1
    address2
    postcode
  }
}
    `;

export function useTagsandMeQuery(options: Omit<Urql.UseQueryArgs<TagsandMeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TagsandMeQuery>({ query: TagsandMeDocument, ...options });
};
export const GetMenuDocument = gql`
    query getMenu($merchantId: Int!) {
  getMenu(merchantId: $merchantId) {
    itemName
    id
    cost
    description
    stock
    imageUrl
    imageAlt
  }
}
    `;

export function useGetMenuQuery(options: Omit<Urql.UseQueryArgs<GetMenuQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetMenuQuery>({ query: GetMenuDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    merchant {
      id
      cpname
      cplogo
      imageUrl
      imageUrl
      city
      address1
      address2
      postcode
      reviewCount
      averageRating
      username
    }
    user {
      id
      firstname
      lastname
      username
      email
      currentTokens
      maxTokens
    }
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MerchantDocument = gql`
    query Merchant($id: Int!) {
  merchant(id: $id) {
    cpname
    city
    address1
    address2
    postcode
  }
}
    `;

export function useMerchantQuery(options: Omit<Urql.UseQueryArgs<MerchantQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchantQuery>({ query: MerchantDocument, ...options });
};
export const MerchantCurrentOrdersDocument = gql`
    query merchantCurrentOrders {
  merchantCurrentOrders {
    orderItems {
      orderId
      foodItemId
      foodItem {
        itemName
        cost
        description
        id
        imageUrl
        imageAlt
        merchantId
      }
    }
    order {
      user {
        firstname
        lastname
      }
      isComplete
      userId
      id
    }
  }
}
    `;

export function useMerchantCurrentOrdersQuery(options: Omit<Urql.UseQueryArgs<MerchantCurrentOrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchantCurrentOrdersQuery>({ query: MerchantCurrentOrdersDocument, ...options });
};
export const MerchantOrdersDocument = gql`
    query merchantOrders {
  merchantOrders {
    orderItems {
      orderId
      foodItemId
      foodItem {
        itemName
        cost
        description
        id
        imageUrl
        imageAlt
        merchantId
      }
    }
    order {
      createdAt
      user {
        firstname
        lastname
      }
      isComplete
      userId
      id
    }
  }
}
    `;

export function useMerchantOrdersQuery(options: Omit<Urql.UseQueryArgs<MerchantOrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchantOrdersQuery>({ query: MerchantOrdersDocument, ...options });
};
export const MerchantPersonalMenuDocument = gql`
    query merchantPersonalMenu {
  merchantPersonalMenu {
    itemName
    description
    id
    itemName
    imageUrl
    imageAlt
    cost
  }
}
    `;

export function useMerchantPersonalMenuQuery(options: Omit<Urql.UseQueryArgs<MerchantPersonalMenuQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchantPersonalMenuQuery>({ query: MerchantPersonalMenuDocument, ...options });
};
export const MerchantTagsDocument = gql`
    query MerchantTags($merchantId: Int!) {
  merchantTags(merchantId: $merchantId) {
    tagName
    id
  }
}
    `;

export function useMerchantTagsQuery(options: Omit<Urql.UseQueryArgs<MerchantTagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchantTagsQuery>({ query: MerchantTagsDocument, ...options });
};
export const MerchantsDocument = gql`
    query Merchants {
  merchants {
    id
    cpname
    imageUrl
    imageAlt
    cplogo
    city
    address1
    address2
    postcode
    reviewCount
    averageRating
    latitude
    longitude
  }
  allMerchantTags {
    merchantId
    tagId
  }
  tags {
    tagName
    id
  }
  me {
    merchant {
      id
      cpname
      cplogo
      imageUrl
      imageUrl
      city
      address1
      address2
      postcode
      reviewCount
      averageRating
      username
      latitude
      longitude
    }
  }
}
    `;

export function useMerchantsQuery(options: Omit<Urql.UseQueryArgs<MerchantsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MerchantsQuery>({ query: MerchantsDocument, ...options });
};
export const ReviewsDocument = gql`
    query Reviews($merchantId: Int!) {
  reviews(merchantId: $merchantId) {
    user {
      username
      firstname
      lastname
    }
    merchant {
      cpname
      id
    }
    comment
    rating
  }
  me {
    user {
      id
      firstname
      lastname
      username
      email
      currentTokens
      maxTokens
    }
  }
}
    `;

export function useReviewsQuery(options: Omit<Urql.UseQueryArgs<ReviewsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ReviewsQuery>({ query: ReviewsDocument, ...options });
};
export const TagsDocument = gql`
    query Tags {
  tags {
    tagName
  }
}
    `;

export function useTagsQuery(options: Omit<Urql.UseQueryArgs<TagsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TagsQuery>({ query: TagsDocument, ...options });
};
export const UserCurrentOrderDocument = gql`
    query userCurrentOrder($userId: Int!) {
  userCurrentOrder(userId: $userId) {
    orderItems {
      order {
        merchantId
      }
      orderId
      foodItem {
        stock
        cost
        itemName
        imageUrl
        imageAlt
        description
      }
      foodItemId
    }
  }
}
    `;

export function useUserCurrentOrderQuery(options: Omit<Urql.UseQueryArgs<UserCurrentOrderQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserCurrentOrderQuery>({ query: UserCurrentOrderDocument, ...options });
};
export const UserOrdersDocument = gql`
    query userOrders($userId: Int!) {
  userOrders(userId: $userId) {
    order {
      merchantId
      isComplete
      createdAt
      merchant {
        cpname
      }
    }
    orderItems {
      createdAt
      orderId
      quantity
      foodItemId
      foodItem {
        stock
        cost
        itemName
        imageUrl
        imageAlt
        description
        createdAt
      }
    }
  }
}
    `;

export function useUserOrdersQuery(options: Omit<Urql.UseQueryArgs<UserOrdersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserOrdersQuery>({ query: UserOrdersDocument, ...options });
};
export const UserReviewsDocument = gql`
    query userReviews($merchantId: Int!, $userId: Int!) {
  userOrders(userId: $userId) {
    order {
      merchantId
      isComplete
      createdAt
      merchant {
        cpname
      }
    }
    orderItems {
      orderId
      quantity
      foodItemId
      foodItem {
        stock
        cost
        itemName
        imageUrl
        imageAlt
        description
      }
    }
  }
  reviews(merchantId: $merchantId) {
    user {
      username
      firstname
      lastname
    }
    merchant {
      cpname
      id
    }
    comment
    rating
  }
  me {
    user {
      id
      firstname
      lastname
      username
      email
      currentTokens
      maxTokens
    }
  }
}
    `;

export function useUserReviewsQuery(options: Omit<Urql.UseQueryArgs<UserReviewsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<UserReviewsQuery>({ query: UserReviewsDocument, ...options });
};