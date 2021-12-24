import { ChevronUpIcon, ChevronDownIcon, DeleteIcon } from "@chakra-ui/icons";
import { Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  PostSnippetFragment,
  useDeletePostMutation,
} from "../generated/graphql";

interface deletesectionProps {
  post: PostSnippetFragment;
}

export const DeleteSection: React.FC<deletesectionProps> = ({ post }) => {
  const [, deletePost] = useDeletePostMutation();
  return (
    <IconButton
      onClick={() => {
        deletePost({
          id: post.id,
        });
      }}
      aria-label="delete post"
      icon={<DeleteIcon w={4} h={4} />}
    />
  );
};
