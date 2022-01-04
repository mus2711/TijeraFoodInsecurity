import { Cache, cacheExchange, QueryInput } from "@urql/exchange-graphcache";
import { SSRExchange } from "next-urql";
import { dedupExchange, fetchExchange } from "urql";
import {
  AddLocationMutation,
  LoginmMutation,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
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
                (result, query) => {
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
                (result, query) => {
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

            register: (_result, _, cache, __) => {
              betterUpdateQuery<RegisterMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                (result, query) => {
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
            //     updatePost: (_result, args, cache, _) => {
            //       cache.invalidate({
            //         __typename: "Post",
            //         id: (args as UpdatePostMutationVariables).id,
            //       });
            //     },
            //     deletePost: (_result, args, cache, _) => {
            //       cache.invalidate({
            //         __typename: "Post",
            //         id: (args as DeletePostMutationVariables).id,
            //       });
            //     },
            //     upvote: (_result, args, cache, _) => {
            //       cache.invalidate({
            //         __typename: "Post",
            //         id: (args as UpvoteMutationVariables).postId,
            //       });

            //       //TODO: uh oh bad code
            //       const allFields = cache.inspectFields("Query");
            //       const fieldInfos = allFields.filter(
            //         (info) => info.fieldName === "upvoteStatus"
            //       );
            //       fieldInfos.forEach((fi) => {
            //         cache.invalidate("Query", "upvoteStatus", fi.arguments || {});
            //       });
            //     },
            //     downvote: (_result, args, cache, _) => {
            //       cache.invalidate({
            //         __typename: "Post",
            //         id: (args as DownvoteMutationVariables).postId,
            //       });

            //       //TODO: uh oh bad code
            //       const allFields = cache.inspectFields("Query");
            //       const fieldInfos = allFields.filter(
            //         (info) => info.fieldName === "upvoteStatus"
            //       );
            //       fieldInfos.forEach((fi) => {
            //         cache.invalidate("Query", "upvoteStatus", fi.arguments || {});
            //       });
            //     },
          },
        },
      }),
      ssrExchange,
      fetchExchange,
    ],
  };
};

// export default createUrqlClient;
