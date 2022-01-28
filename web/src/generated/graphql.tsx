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
  averageRating?: Maybe<Scalars['Float']>;
  cplogo?: Maybe<Scalars['String']>;
  cpname: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  imageAlt?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
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
  merchantId: Scalars['Int'];
  tagId: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addImage: Merchant;
  addLocation: Merchant;
  addLogo: Merchant;
  addMerchantTag: Scalars['Boolean'];
  addReview: Review;
  changeCpname: Merchant;
  changeFirstname: User;
  changeLastName: User;
  createTag: Tag;
  deleteReview: Scalars['Boolean'];
  deleteTag: Scalars['Boolean'];
  login: UserResponse;
  loginm: MerchantResponse;
  logout: Scalars['Boolean'];
  logoutm: Scalars['Boolean'];
  register: UserResponse;
  registerm: MerchantResponse;
  removeMerchantTag: Scalars['Boolean'];
};


export type MutationAddImageArgs = {
  imageAlt?: Maybe<Scalars['String']>;
  imageUrl: Scalars['String'];
};


export type MutationAddLocationArgs = {
  location: Scalars['String'];
};


export type MutationAddLogoArgs = {
  cplogo: Scalars['String'];
};


export type MutationAddMerchantTagArgs = {
  tagId: Scalars['Int'];
};


export type MutationAddReviewArgs = {
  comment: Scalars['String'];
  merchantId: Scalars['Int'];
  rating: Scalars['Int'];
};


export type MutationChangeCpnameArgs = {
  cpname: Scalars['String'];
};


export type MutationChangeFirstnameArgs = {
  firstname: Scalars['String'];
};


export type MutationChangeLastNameArgs = {
  lastname: Scalars['String'];
};


export type MutationCreateTagArgs = {
  tagName: Scalars['String'];
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


export type MutationRemoveMerchantTagArgs = {
  tagId: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  allMerchantTags: Array<MerchantTag>;
  me: MeResponse;
  merchant?: Maybe<Merchant>;
  merchantTags: Array<Tag>;
  merchants: Array<Merchant>;
  reviews: Array<Review>;
  tagMerchants: Array<Merchant>;
  tags: Array<Tag>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryMerchantArgs = {
  id: Scalars['Int'];
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
  merchant: Merchant;
  rating: Scalars['Float'];
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
  createdAt: Scalars['String'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Int'];
  lastname: Scalars['String'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type RegularErrorFragment = { __typename?: 'FieldError', field: string, message: string };

export type RegularMerchantFragment = { __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, location?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> };

export type RegularMerchantErrorFragment = { __typename?: 'FieldMerchantError', field: string, merchantmsg: string };

export type RegularMerchantResponseFragment = { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, location?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> }> };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> };

export type AddLocationMutationVariables = Exact<{
  location: Scalars['String'];
}>;


export type AddLocationMutation = { __typename?: 'Mutation', addLocation: { __typename?: 'Merchant', id: number } };

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

export type ChangeFirstnameMutationVariables = Exact<{
  firstname: Scalars['String'];
}>;


export type ChangeFirstnameMutation = { __typename?: 'Mutation', changeFirstname: { __typename?: 'User', firstname: string, lastname: string } };

export type ChangeLastNameMutationVariables = Exact<{
  lastname: Scalars['String'];
}>;


export type ChangeLastNameMutation = { __typename?: 'Mutation', changeLastName: { __typename?: 'User', firstname: string, lastname: string } };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> } };

export type LoginmMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginmMutation = { __typename?: 'Mutation', loginm: { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, location?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> }> } };

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


export type RegistermMutation = { __typename?: 'Mutation', registerm: { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, username: string, location?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> }> } };

export type TagsandMeQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsandMeQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', tagName: string, id: number }>, me: { __typename?: 'MeResponse', merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, cplogo?: Maybe<string>, imageUrl?: Maybe<string>, location?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number>, username: string }>, user?: Maybe<{ __typename?: 'User', id: number, firstname: string, lastname: string, username: string, email: string }> }, merchantTags: Array<{ __typename?: 'Tag', tagName: string, id: number }> };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'MeResponse', merchant?: Maybe<{ __typename?: 'Merchant', id: number, cpname: string, cplogo?: Maybe<string>, imageUrl?: Maybe<string>, location?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number>, username: string }>, user?: Maybe<{ __typename?: 'User', id: number, firstname: string, lastname: string, username: string, email: string }> } };

export type MerchantTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchantTagsQuery = { __typename?: 'Query', merchantTags: Array<{ __typename?: 'Tag', tagName: string, id: number }> };

export type MerchantsQueryVariables = Exact<{ [key: string]: never; }>;


export type MerchantsQuery = { __typename?: 'Query', merchants: Array<{ __typename?: 'Merchant', id: number, cpname: string, imageUrl?: Maybe<string>, imageAlt?: Maybe<string>, cplogo?: Maybe<string>, location?: Maybe<string>, reviewCount: number, averageRating?: Maybe<number> }> };

export type ReviewsQueryVariables = Exact<{
  merchantId: Scalars['Int'];
}>;


export type ReviewsQuery = { __typename?: 'Query', reviews: Array<{ __typename?: 'Review', comment: string, rating: number, user: { __typename?: 'User', username: string, firstname: string, lastname: string }, merchant: { __typename?: 'Merchant', cpname: string, id: number } }> };

export type TagsQueryVariables = Exact<{ [key: string]: never; }>;


export type TagsQuery = { __typename?: 'Query', tags: Array<{ __typename?: 'Tag', tagName: string }> };

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
  location
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
export const AddLocationDocument = gql`
    mutation AddLocation($location: String!) {
  addLocation(location: $location) {
    id
  }
}
    `;

export function useAddLocationMutation() {
  return Urql.useMutation<AddLocationMutation, AddLocationMutationVariables>(AddLocationDocument);
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
export const TagsandMeDocument = gql`
    query TagsandMe {
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
      location
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
  merchantTags {
    tagName
    id
  }
}
    `;

export function useTagsandMeQuery(options: Omit<Urql.UseQueryArgs<TagsandMeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<TagsandMeQuery>({ query: TagsandMeDocument, ...options });
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
      location
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
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MerchantTagsDocument = gql`
    query MerchantTags {
  merchantTags {
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
    location
    reviewCount
    averageRating
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