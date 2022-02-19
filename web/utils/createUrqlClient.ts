import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import { SSRExchange } from "next-urql";
import { dedupExchange } from "urql";
import {
  AddLocationMutation,
  AddReviewMutation,
  ChangeFirstnameMutation,
  ChangeLastNameMutation,
  CreateFoodItemMutation,
  DeleteFoodItemMutation,
  LoginmMutation,
  LoginMutation,
  LogoutmMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  MerchantsDocument,
  MerchantsQuery,
  RegisterMutation,
  TagsandMeDocument,
  TagsandMeQuery,
} from "../src/generated/graphql";
import { isServer } from "./isServer";

export function betterUpdateQuery<Result, Query>(
  cache: Cache,
  qi: QueryInput,
  result: any,
  fn: (r: Result, q: Query) => Query
) {
  return cache.updateQuery(qi, (data) => fn(result, data as any) as any);
}

export const createUrqlClient = (ssrExchange: SSRExchange, ctx: any) => {
  let cookie = "";
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
  }

  return {
    url: `${process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT}`,

    fetchOptions: {
      credentials: "include",
      headers: cookie ? { cookie } : undefined,
    } as const,

    exchanges: [
      dedupExchange,
      cacheExchange({
        updates: {
          Mutation: {
            login: (_result, _, cache, __) => {
              betterUpdateQuery<LoginMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result: any, query) => {
                  if (result.login.errors) {
                    return query;
                  } else {
                    return {
                      me: result.login.user,
                    };
                  }
                }
              );
            },

            loginm: (_result, _, cache, __) => {
              betterUpdateQuery<LoginmMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result: any, query) => {
                  console.log("result", result);
                  if (result.loginm.errors) {
                    return query;
                  } else {
                    return {
                      me: result.loginm.merchant,
                    };
                  }
                }
              );
              //TODO: uh oh bad code
            },

            addLocation: (_result, _, cache, __) => {
              betterUpdateQuery<AddLocationMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.addLocation) {
                    console.log("cache trig!");
                    return { me: result.addLocation };
                  }
                }
              );
            },

            addReview: (_result, _, cache, __) => {
              betterUpdateQuery<AddReviewMutation, MerchantsQuery>(
                cache,
                { query: MerchantsDocument },
                _result,
                (result, query) => {
                  if (result.addReview) {
                    console.log("cache trig!");
                    return { merchants: result.addReview };
                  }
                }
              );
            },

            register: (_result, _, cache, __) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result: any, query) => {
                  if (result.register.errors) {
                    return query;
                  } else {
                    return {
                      me: result.register.user,
                    };
                  }
                }
              );
            },
            logout: (_result, _, cache, __) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            logoutm: (_result, _, cache, __) => {
              betterUpdateQuery<LogoutmMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            changeFirstname: (_result, _, cache, __) => {
              betterUpdateQuery<ChangeFirstnameMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
                  if (result.changeFirstname) {
                    return {
                      me: result.changeFirstname.firstname,
                    };
                  }
                }
              );
            },
            changeLastName: (_result, _, cache, __) => {
              betterUpdateQuery<ChangeLastNameMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,

                (result, query) => {
                  if (result.changeLastName) {
                    return {
                      me: result.changeLastName.lastname,
                    };
                  }
                }
              );
            },
            deleteFoodItem: (_result, args, cache, info) => {
              betterUpdateQuery<DeleteFoodItemMutation, TagsandMeQuery>(
                cache,
                {
                  query: TagsandMeDocument,
                  variables: { merchantId: args.idMerchant },
                },
                _result,
                (result, query) => {
                  console.log("args: ", args.idMerchant);
                  console.log("cache: ", cache);
                  console.log("info: ", info);
                  if (result.deleteFoodItem) {
                    console.log(result);

                    return {
                      getMenu: result.deleteFoodItem,
                    };
                  }
                }
              );
            },
            createFoodItem: (_result, args, cache, info) => {
              betterUpdateQuery<CreateFoodItemMutation, TagsandMeQuery>(
                cache,
                {
                  query: TagsandMeDocument,
                  variables: { merchantId: args.idMerchant },
                },
                _result,
                (result, query) => {
                  console.log("args: ", args.idMerchant);
                  console.log("cache: ", cache);
                  console.log("info: ", info);
                  if (result.createFoodItem) {
                    console.log(result);

                    return {
                      getMenu: result.createFoodItem,
                    };
                  }
                }
              );
            },
          },
        },
      }),
      ssrExchange,
      // fetchExchange,
      multipartFetchExchange,
    ],
  };
};

// export default createUrqlClient;
