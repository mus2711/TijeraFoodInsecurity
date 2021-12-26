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

export type Merchant = {
  __typename?: 'Merchant';
  cpname: Scalars['String'];
  createdAt: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type MerchantResponse = {
  __typename?: 'MerchantResponse';
  errors?: Maybe<Array<FieldMerchantError>>;
  merchant?: Maybe<Merchant>;
};

export type Mutation = {
  __typename?: 'Mutation';
  login: UserResponse;
  loginm: MerchantResponse;
  logout: Scalars['Boolean'];
  logoutm: Scalars['Boolean'];
  register: UserResponse;
  registerm: MerchantResponse;
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

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  mem?: Maybe<Merchant>;
  merchant?: Maybe<Merchant>;
  merchants: Array<Merchant>;
  user?: Maybe<User>;
  users: Array<User>;
};


export type QueryMerchantArgs = {
  id: Scalars['Int'];
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

export type RegularMerchantFragment = { __typename?: 'Merchant', id: number, username: string, cpname: string, email: string };

export type RegularMerchantErrorFragment = { __typename?: 'FieldMerchantError', field: string, merchantmsg: string };

export type RegularMerchantResponseFragment = { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, username: string, cpname: string, email: string }> };

export type RegularUserFragment = { __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string };

export type RegularUserResponseFragment = { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> };

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'UserResponse', errors?: Maybe<Array<{ __typename?: 'FieldError', field: string, message: string }>>, user?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> } };

export type LoginmMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginmMutation = { __typename?: 'Mutation', loginm: { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, username: string, cpname: string, email: string }> } };

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


export type RegistermMutation = { __typename?: 'Mutation', registerm: { __typename?: 'MerchantResponse', errors?: Maybe<Array<{ __typename?: 'FieldMerchantError', field: string, merchantmsg: string }>>, merchant?: Maybe<{ __typename?: 'Merchant', id: number, username: string, cpname: string, email: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: Maybe<{ __typename?: 'User', id: number, username: string, firstname: string, lastname: string, email: string }> };

export type MemQueryVariables = Exact<{ [key: string]: never; }>;


export type MemQuery = { __typename?: 'Query', mem?: Maybe<{ __typename?: 'Merchant', id: number, username: string, cpname: string, email: string }> };

export const RegularMerchantErrorFragmentDoc = gql`
    fragment RegularMerchantError on FieldMerchantError {
  field
  merchantmsg
}
    `;
export const RegularMerchantFragmentDoc = gql`
    fragment RegularMerchant on Merchant {
  id
  username
  cpname
  email
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
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const MemDocument = gql`
    query Mem {
  mem {
    ...RegularMerchant
  }
}
    ${RegularMerchantFragmentDoc}`;

export function useMemQuery(options: Omit<Urql.UseQueryArgs<MemQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MemQuery>({ query: MemDocument, ...options });
};