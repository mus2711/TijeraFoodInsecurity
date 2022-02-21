import {
  Box,
  Flex,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Badge,
  Button,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {
  useLogoutmMutation,
  useLogoutMutation,
  useMeQuery,
} from "../generated/graphql";
import { useRouter } from "next/router";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { HiUser } from "react-icons/hi";
import {
  MdFoodBank,
  MdMonetizationOn,
  MdReceipt,
  MdSettings,
  MdShoppingBasket,
} from "react-icons/md";

interface NavbarProps {
  title: string;
  icon?: "stack" | "arrow" | null;
}

export const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [, logout] = useLogoutMutation();
  const [, logoutm] = useLogoutmMutation();
  const [{ data, fetching }] = useMeQuery();

  let body = null;
  if (fetching) {
  } else if (data?.me == null) {
  } else if (!data?.me.user && !data?.me.merchant) {
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
                    Basket
                  </MenuItem>
                  <NextLink href={"/login"}>
                    <MenuItem icon={<HiUser />} command="⌘⇧N">
                      Log in
                    </MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
            </Box>
            <Box m={0} fontWeight={"bold"} maxWidth={"40px"}>
              <img src="https://i.ibb.co/C8bKrfp/tijera.png"></img>
            </Box>

            <Button
              variant={"outline"}
              color="black"
              colorScheme={"cyan"}
              borderRadius={20}
              borderWidth={1}
              onClick={() => router.push("/login")}
            >
              Log In
            </Button>
          </HStack>
        </Flex>
      </Box>
    );
  } else if (data.me.merchant) {
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
                  <NextLink href={"./orders"}>
                    <MenuItem
                      icon={<MdMonetizationOn />}
                      command="⌘T"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Orders
                    </MenuItem>
                  </NextLink>
                  <NextLink href={"./merchantreviews"}>
                    <MenuItem
                      icon={<MdMonetizationOn />}
                      command="⌘T"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Your Reviews
                    </MenuItem>
                  </NextLink>
                  <NextLink href={"./merchantaccount"}>
                    <MenuItem
                      icon={<HiUser />}
                      command="⌘T"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Account
                    </MenuItem>
                  </NextLink>
                  <NextLink href={"./settings"}>
                    <MenuItem
                      icon={<MdSettings />}
                      command="⌘N"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Settings
                    </MenuItem>
                  </NextLink>
                  <NextLink href={"/"}>
                    <MenuItem
                      icon={<HiUser />}
                      onClick={async () => {
                        await logoutm();
                        router.reload();
                      }}
                      command="⌘⇧N"
                    >
                      {data.me.merchant.username} (Logout)
                    </MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
            </Box>
            <Box m={0} fontWeight={"bold"} maxWidth={"40px"}>
              <img src="https://i.ibb.co/C8bKrfp/tijera.png"></img>
            </Box>

            <Box></Box>
          </HStack>
        </Flex>
      </Box>
    );
  } else if (data.me.user) {
    body = (
      <>
        <Box>
          <Flex h={10} alignItems={"center"} justifyContent={"space-evenly"}>
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
                    <NextLink href={"./userorders"}>
                      <MenuItem
                        icon={<MdReceipt />}
                        command="⌘⇧N"
                        onClick={isOpen ? onClose : onOpen}
                      >
                        Your Orders
                      </MenuItem>
                    </NextLink>
                    <NextLink href={"/checkout"}>
                      <MenuItem
                        icon={<MdShoppingBasket />}
                        command="⌘⇧N"
                        onClick={isOpen ? onClose : onOpen}
                      >
                        Basket
                      </MenuItem>
                    </NextLink>
                    <NextLink href={"./settings"}>
                      <MenuItem
                        icon={<MdSettings />}
                        command="⌘N"
                        onClick={isOpen ? onClose : onOpen}
                      >
                        Settings
                      </MenuItem>
                    </NextLink>

                    <MenuItem
                      icon={<HiUser />}
                      command="⌘⇧N"
                      onClick={async () => {
                        await logout();
                        router.reload();
                      }}
                    >
                      {data.me.user?.username} (Logout)
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box m={0} fontWeight={"bold"} maxWidth={"40px"}>
                <img src="https://i.ibb.co/C8bKrfp/tijera.png"></img>
              </Box>

              <Box>
                <Badge colorScheme={"black"}>
                  Current Tokens:
                  {data.me.user.currentTokens && data.me.user.maxTokens
                    ? " " +
                      (
                        (data?.me?.user?.currentTokens * 100) /
                        data?.me?.user?.maxTokens
                      ).toPrecision(3) +
                      "%"
                    : "NaN"}
                </Badge>
              </Box>
            </HStack>
          </Flex>
        </Box>
      </>
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="cyan.300"
      p={4}
      align="center"
    >
      <Flex flex={1} m="auto">
        <Box m="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};
