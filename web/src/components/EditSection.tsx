import {
  ChevronUpIcon,
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { Button, Flex, IconButton } from "@chakra-ui/react";
import React from "react";
import {
  PostSnippetFragment,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../generated/graphql";
import NextLink from "next/link";

interface editProp {
  post: PostSnippetFragment;
}

export const EditSection: React.FC<editProp> = ({ post }) => {
  return (
    <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
      <IconButton
        mr={3}
        aria-label="edit post"
        icon={<EditIcon w={4} h={4} />}
      />
    </NextLink>
  );
};
