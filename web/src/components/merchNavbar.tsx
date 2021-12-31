import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutmMutation, useMemQuery } from "../generated/graphql";
import { useRouter } from "next/router";
import { CloseIcon, HamburgerIcon } from "@chakra-ui/icons";
import { HiUser } from "react-icons/hi";
import { MdFoodBank, MdSettings, MdShoppingBasket } from "react-icons/md";
import { ReactNode } from "react";

interface NavbarProps {
  title: string;
  icon?: "stack" | "arrow" | null;
}

export const Merchnavbar: React.FC<NavbarProps> = ({ title, icon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [{ fetching: LogoutmFetching }, logoutm] = useLogoutmMutation();
  const [{ data, fetching }] = useMemQuery();

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
  } else if (!data?.mem) {
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
                <MenuList bg={"black"}>
                  <NextLink href={"./search"}>
                    <MenuItem
                      icon={<MdFoodBank />}
                      command="⌘⇧N"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Food Search
                    </MenuItem>
                  </NextLink>
                  {/* <MenuItem
                    icon={<MdShoppingBasket />}
                    command="⌘⇧N"
                    onClick={isOpen ? onClose : onOpen}
                  >
                    Basket (1)
                  </MenuItem> */}
                  <NextLink href={"./merchantaccount"}>
                    <MenuItem
                      icon={<HiUser />}
                      command="⌘T"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Account
                    </MenuItem>
                  </NextLink>
                  <MenuItem
                    icon={<MdSettings />}
                    command="⌘N"
                    onClick={isOpen ? onClose : onOpen}
                  >
                    Settings
                  </MenuItem>
                  <NextLink href={"/loginmerchant"}>
                    <MenuItem icon={<HiUser />} command="⌘⇧N">
                      Log in
                    </MenuItem>
                  </NextLink>
                </MenuList>
              </Menu>
            </Box>
            <Box m={0} fontWeight={"bold"}>
              {title}
            </Box>

            <NextLink href={"/"}>
              <Box maxWidth={"55px"}>
                <img src="https://i.ibb.co/H7stfJf/200e0beeccb5598b2d3dc83db38f3c52.png"></img>
              </Box>
            </NextLink>
          </HStack>
        </Flex>
      </Box>
    );
  } else {
    body = body = (
      <>
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
                  <MenuList bg={"black"}>
                    <NextLink href={"./search"}>
                      <MenuItem
                        icon={<MdFoodBank />}
                        command="⌘⇧N"
                        onClick={isOpen ? onClose : onOpen}
                      >
                        Food Search
                      </MenuItem>
                    </NextLink>
                    {/* <MenuItem
                      icon={<MdShoppingBasket />}
                      command="⌘⇧N"
                      onClick={isOpen ? onClose : onOpen}
                    >
                      Basket (1)
                    </MenuItem> */}
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
                    <MenuItem
                      icon={<HiUser />}
                      command="⌘⇧N"
                      onClick={async () => {
                        await logoutm();
                        router.reload();
                      }}
                      bg={"red.200"}
                    >
                      {data.mem.username} (Logout)
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
              <Box m={0} fontWeight={"bold"}>
                {title}
              </Box>

              <NextLink href={"/"}>
                <Box maxWidth={"55px"}>
                  <img src="https://i.ibb.co/H7stfJf/200e0beeccb5598b2d3dc83db38f3c52.png"></img>
                </Box>
              </NextLink>
            </HStack>
          </Flex>
        </Box>
        {/* 
        <Button
          onClick={async () => {
            await logout();
            router.reload();
          }}
          isLoading={LogoutFetching}
          backgroundColor="rgba(152, 52, 90, 0.0)"
        >
          ({data.me.username}) Logout
        </Button> */}
      </>
    );
  }
  return (
    <Flex
      zIndex={1}
      position="sticky"
      top={0}
      bg="black"
      color={"white"}
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
