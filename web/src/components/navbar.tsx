import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../../utils/isServer";
import router, { useRouter } from "next/router";
import {
  AddIcon,
  ChevronDownIcon,
  CloseIcon,
  EditIcon,
  ExternalLinkIcon,
  HamburgerIcon,
  RepeatIcon,
} from "@chakra-ui/icons";
import { Image } from "@chakra-ui/react";
import { HiUser } from "react-icons/hi";
import { MdFoodBank, MdSettings, MdShoppingBasket } from "react-icons/md";
import { ReactNode } from "react";

interface NavbarProps {
  title: string;
  icon?: "stack" | "arrow" | null;
}

export const Navbar: React.FC<NavbarProps> = ({ title, icon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [{ fetching: LogoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });

  const Links = ["Dashboard", "Projects", "Team"];

  const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
      }}
      href={"#"}
    >
      {children}
    </Link>
  );

  let body = null;
  if (fetching) {
  } else if (!data?.me) {
    body = (
      <Box>
        <Flex h={10} alignItems={"center"} justifyContent={"space-between"}>
          <HStack spacing={"25vw"}>
            <Box>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={
                    isOpen ? (
                      <CloseIcon />
                    ) : (
                      <HamburgerIcon width={6} height={6} />
                    )
                  }
                  variant="none"
                  onClick={isOpen ? onClose : onOpen}
                />
                <MenuList bg={"white"}>
                  <NextLink href={"./search"}>
                    <MenuItem
                      icon={<MdFoodBank />}
                      command="⌘⇧N"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Food Search
                    </MenuItem>
                  </NextLink>
                  <MenuItem
                    icon={<MdShoppingBasket />}
                    command="⌘⇧N"
                    onClick={isOpen ? onClose : onOpen}
                  >
                    Basket (1)
                  </MenuItem>
                  <MenuItem
                    icon={<HiUser />}
                    command="⌘T"
                    onClick={isOpen ? onClose : onOpen}
                  >
                    Account
                  </MenuItem>
                  <MenuItem
                    icon={<MdSettings />}
                    command="⌘N"
                    onClick={isOpen ? onClose : onOpen}
                  >
                    Settings
                  </MenuItem>
                </MenuList>
              </Menu>
            </Box>
            <Box m={0} fontWeight={"bold"}>
              {title}
            </Box>
            {/* <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack> */}
            {/* <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    size={"sm"}
                    src={
                      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                    }
                  />
                </MenuButton>
                <MenuList bg={"white"}>
                  <MenuItem>Link 1</MenuItem>
                  <MenuItem>Link 2</MenuItem>
                  <MenuDivider />
                  <MenuItem>Link 3</MenuItem>
                </MenuList>
              </Menu>
              
            </Flex> */}
            <NextLink href={"/"}>
              <Box maxWidth={"55px"}>
                <img src="https://i.ibb.co/H7stfJf/200e0beeccb5598b2d3dc83db38f3c52.png"></img>
              </Box>
            </NextLink>
          </HStack>

          {/* <Box>
            <Heading textAlign={"center"} size={"md"}>
              {title}
            </Heading>
          </Box>
          <Box>
            <NextLink href="/register">
              <Image
                height={16}
                src="https://i.ibb.co/XCFMwjv/200e0beeccb5598b2d3dc83db38f3c52.png"
              />
            </NextLink>
            <Spacer />
          </Box> */}
        </Flex>
      </Box>
    );
  } else {
    body = (
      <Flex align="center">
        {/* <Box mr={2}>{data.me.userName}</Box> */}
        <NextLink href="/postcreator">
          <Button
            as={Link}
            ml="auto"
            borderColor="lightgray"
            backgroundColor="rgba(52, 52, 52, 0.0)"
            mr={4}
          >
            Create Post
          </Button>
        </NextLink>

        {/* <NextLink href="/postcreator">
          <Link mr={2}>Create Post</Link>
        </NextLink> */}
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={LogoutFetching}
          backgroundColor="rgba(152, 52, 90, 0.0)"
        >
          ({data.me.userName}) Logout
        </Button>
      </Flex>
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="#5998A0"
      // ml="auto"
      p={4}
      align="center"
    >
      <Flex flex={1} m="auto">
        <Box m="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};
