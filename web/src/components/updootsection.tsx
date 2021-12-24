import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { Flex } from "@chakra-ui/layout";
import { IconButton } from "@chakra-ui/react";
import React from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <IconButton
        onClick={() => {
          console.log("postId mate ", post.id);
          let post_id = 0;
          if (post.id) {
            post_id = post.id;
            console.log("post_id", post_id);
          }
          vote({
            Value: 1,
            PostId: post_id,
          });
        }}
        backgroundColor={post.voteStatus === 1 ? "yellowgreen" : undefined}
        aria-label="Updoot post"
        maxBlockSize={5}
        icon={<ChevronUpIcon w={4} h={4} />}
      />

      {post.points}

      <IconButton
        onClick={() => {
          vote({
            PostId: post.id,
            Value: -1,
          });
        }}
        backgroundColor={post.voteStatus === -1 ? "firebrick" : undefined}
        aria-label=" downdoot post"
        maxBlockSize={5}
        icon={<ChevronDownIcon w={4} h={4} />}
      />
    </Flex>
  );
};
