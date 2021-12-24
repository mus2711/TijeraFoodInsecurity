import { stringifyVariables } from "@urql/core";
import { cacheExchange, Resolver, Cache } from "@urql/exchange-graphcache";
import Router from "next/router";
import { Context, dedupExchange, Exchange, fetchExchange, Query } from "urql";
import { pipe, tap } from "wonka";
import {
  DeletePostMutationVariables,
  LoginMutation,
  LogoutMutation,
  MeDocument,
  MeQuery,
  RegisterMutation,
  VoteMutation,
  VoteMutationVariables,
} from "../src/generated/graphql";

import { betterUpdateQuery } from "./betterUpdateQuery";
import gql from "graphql-tag";
import { isServer } from "./isServer";
import React from "react";

const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    // console.log("fieldName: ", fieldName);
    // console.log("entityKey:", entityKey);
    const allFields = cache.inspectFields(entityKey);
    // console.log("allFields:", allFields);

    // console.log("FieldArgs:", fieldArgs);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    // console.log("fieldinfo", fieldInfos);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    // console.log("field args: ", fieldArgs);
    // info.partial = true;

    const fieldKey = `(${fieldName})(${stringifyVariables(fieldArgs)})`;
    // console.log("key we created", fieldKey);

    const isItInTheCache = cache.resolve(
      cache.resolve(entityKey, fieldKey) as string,
      "posts"
    );
    // console.log("iiitc", isItInTheCache);

    info.partial = !isItInTheCache;
    // console.log("info", info.partial);

    const results: string[] = [];
    let hasMore = true;
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });
    console.log("results:", results);
    return {
      __typename: "PaginatedPosts",
      hasMore: true,
      posts: results,
    };
  };
};

const cursorPagination2 = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;
    const allFields = cache.inspectFields(entityKey);
    const fieldInfos = allFields.filter((info) => info.fieldName === fieldName);
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItInTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts"
    );
    // console.log("iitc: ", isItInTheCache);
    info.partial = !isItInTheCache;
    // console.log("info.partial:", info.partial);
    let hasMore = true;
    const results: string[] = [];
    fieldInfos.forEach((fi) => {
      const key = cache.resolve(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");
      if (!_hasMore) {
        hasMore = _hasMore as boolean;
      }
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore,
      posts: results,
    };
  };
};

export const errorExchange: Exchange =
  ({ forward }) =>
  (ops$) => {
    return pipe(
      forward(ops$),
      tap(({ error }) => {
        // If the OperationResult has an error send a request to sentry
        if (error) {
          if (error?.message.includes("not authenticated.")) {
            Router.replace("/login");
          }
        }
      })
    );
  };

function invalidateAllPosts(cache: Cache) {
  const allFields = cache.inspectFields("Query");
  const fieldInfos = allFields.filter((info) => info.fieldName === "posts");
  fieldInfos.forEach((fi) => {
    cache.invalidate("Query", "posts", fi.arguments || {});
  });
}

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  let cookie = "";
  // console.log("ssr:", ssrExchange);
  // console.log("ctx:", ctx);
  if (isServer()) {
    cookie = ctx?.req?.headers?.cookie;
    console.log("cookie:", cookie);
  }

  return {
    // url: "https://studio.apollographql.com",
    url: "https://localhost:8081/graphql",
    fetchOptions: {
      credentials: "include" as const,
      headers: cookie
        ? {
            cookie,
          }
        : undefined,
    },
    exchanges: [
      dedupExchange,
      cacheExchange({
        keys: {
          PaginatedPosts: () => null,
        },
        resolvers: {
          Query: {
            posts: cursorPagination2(),
          },
        },
        updates: {
          Mutation: {
            vote: (_result, args, cache, info) => {
              // const { Value, PostId } = args as VoteMutationVariables;
              const Value = args["value"];
              const PostId = args["postId"];
              console.log("args: ", args);

              console.log("postId: ", PostId);
              console.log("Value: ", Value);
              const data = cache.readFragment(
                gql`
                  fragment _ on Post {
                    id
                    points
                    voteStatus
                  }
                `,
                { id: PostId } as any
              );

              if (data) {
                if (data.voteStatus === Value) {
                  return;
                }
                const newPoints =
                  (data.points as number) + (!data.voteStatus ? 1 : 2) * Value;
                cache.writeFragment(
                  gql`
                    fragment __ on Post {
                      points
                      voteStatus
                    }
                  `,
                  { id: PostId, points: newPoints, voteStatus: Value } as any
                );
              }
            },
            createPost: (_result, args, cache, info) => {
              invalidateAllPosts(cache);
            },

            deletePost: (_result, args, cache, info) => {
              console.log("args: ", args);
              cache.invalidate({
                __typename: "Post",
                id: (args as DeletePostMutationVariables).id,
              });
            },

            logout: (_result, args, cache, info) => {
              betterUpdateQuery<LogoutMutation, MeQuery>(
                cache,
                { query: MeDocument },
                _result,
                () => ({ me: null })
              );
            },
            login: (_result, args, cache, info) => {
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
              invalidateAllPosts(cache);
            },
            register: (_result, args, cache, info) => {
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
          },
        },
      }),
      errorExchange,
      ssrExchange,
      fetchExchange,
    ],
  };
};

// export const createUrqlClient = (ssrExchange: any, ctx: any) => {
//   let cookie = "";
//   console.log(ctx);
//   // if (isServer()) {
//   //   cookie = ctx.req.headers.cookie;
//   // }
//   return {
//     url: "http://localhost:4000/graphql",
//     fetchOptions: {
//       credentials: "include" as const,
//       headers: cookie
//         ? {
//             cookie,
//           }
//         : undefined,
//     },
//     exchanges: [
//       dedupExchange,
//       cacheExchange({
//         keys: {
//           PaginatedPosts: () => null,
//         },
//         resolvers: {
//           Query: {
//             posts: cursorPagination(),
//           },
//         },
//         updates: {
//           Mutation: {
//             vote: (_result, args, cache, info) => {
//               const { PostId, Value } = args as VoteMutationVariables;
//               const data = cache.readFragment(
//                 gql`
//                   fragment _ on Post {
//                     id
//                     points
//                     voteStatus
//                   }
//                 `,
//                 { id: PostId } as any
//               );

//               if (data) {
//                 if (data.voteStatus === Value) {
//                   return;
//                 }
//                 const newPoints =
//                   (data.points as number) + (!data.voteStatus ? 1 : 2) * Value;
//                 cache.writeFragment(
//                   gql`
//                     fragment _ on Post {
//                       points
//                       voteStatus
//                     }
//                   `,
//                   { id: PostId, points: newPoints, voteStatus: Value } as any
//                 );
//               }
//             },

//             createPost: (_result, args, cache, info) => {
//               const allFields = cache.inspectFields("Query");
//               const fieldInfos = allFields.filter(
//                 (info) => info.fieldName === "posts"
//               );

//               fieldInfos.forEach((fi) => {
//                 cache.invalidate("Query", "posts", fi.arguments || {});
//               });
//             },

//             logout: (_result, args, cache, info) => {
//               betterUpdateQuery<LogoutMutation, MeQuery>(
//                 cache,
//                 { query: MeDocument },
//                 _result,
//                 () => {
//                   return { me: null };
//                 }
//               );
//             },
//             login: (_result, args, cache, info) => {
//               betterUpdateQuery<LoginMutation, MeQuery>(
//                 cache,
//                 { query: MeDocument },
//                 _result,
//                 (result, query) => {
//                   if (result.login.errors) {
//                     return query;
//                   } else {
//                     return {
//                       me: result.login.user,
//                     };
//                   }
//                 }
//               );
//             },

//             register: (_result, args, cache, info) => {
//               betterUpdateQuery<RegisterMutation, MeQuery>(
//                 cache,
//                 { query: MeDocument },
//                 _result,
//                 (result, query) => {
//                   if (result.register.errors) {
//                     return query;
//                   } else {
//                     return {
//                       me: result.register.user,
//                     };
//                   }
//                 }
//               );
//             },
//           },
//         },
//       }),
//       errorExchange,
//       ssrExchange,
//       fetchExchange,
//     ],
//   };
// };
