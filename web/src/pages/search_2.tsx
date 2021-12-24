import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import React from "react";
import {
  Avatar,
  Box,
  // Box,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Layout } from "../components/layout";
import {
  MdSearch,
  MdKeyboardVoice,
  MdOutlineLocationSearching,
} from "react-icons/md";
import { TabNavigation, Tab, Pane, Tablist, Paragraph } from "evergreen-ui";
import { ChevronRightIcon } from "@chakra-ui/icons";
import NextLink from "next/link";

const bl = "#5998A0";

const Index = () => {
  // const [value, setValue] = React.useState("1");

  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValue(newValue);
  // };
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [tabs] = React.useState(["Traits", "Event History", "Identities"]);
  return (
    <Layout title="SEARCH">
      <Flex direction="column" justifyContent="center" alignItems="center">
        <InputGroup maxWidth={"500px"} width={"75vw"}>
          <InputLeftElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<MdSearch color="gray.300" />}
          />
          <Input name="searchBar" placeholder="Search" />
          <InputRightElement
            pointerEvents="none"
            color="gray.300"
            fontSize="1.2em"
            children={<MdKeyboardVoice color="gray.300" />}
          />
        </InputGroup>
        <Pane height={120} paddingTop={"20px"}>
          <Tablist marginBottom={16} flexBasis={240} marginRight={24}>
            {tabs.map((tab, index) => (
              <Tab
                key={tab}
                id={tab}
                onSelect={() => setSelectedIndex(index)}
                isSelected={index === selectedIndex}
                aria-controls={`panel-${tab}`}
              >
                {tab}
              </Tab>
            ))}
          </Tablist>
          <Pane background="tint1" flex="1">
            {tabs.map((tab, index) => (
              <Pane
                key={tab}
                id={`panel-${tab}`}
                role="tabpanel"
                aria-labelledby={tab}
                aria-hidden={index !== selectedIndex}
                display={index === selectedIndex ? "block" : "none"}
              >
                <Paragraph>Panel {tab}</Paragraph>
              </Pane>
            ))}
          </Pane>
        </Pane>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
