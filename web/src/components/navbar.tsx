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
import React, { useState } from "react";
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
  MdSettings,
  MdShoppingBasket,
} from "react-icons/md";
import { ReactNode } from "react";
import { useGlobalState } from "../state/state";

interface NavbarProps {
  title: string;
  icon?: "stack" | "arrow" | null;
}

export const Navbar: React.FC<NavbarProps> = ({ title, icon }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [{ fetching: LogoutFetching }, logout] = useLogoutMutation();
  const [{ fetching: LogoutmFetching }, logoutm] = useLogoutmMutation();
  let [navCol, setnavCol] = useState("blue");
  const [{ data, fetching }] = useMeQuery();
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
                  <NextLink href={"./"}>
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
  } else if (data.me.user) {
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
                      bgColor={"black"}
                      color={"white"}
                    >
                      {data.me.user?.username} (Logout)
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
      bg="teal"
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
