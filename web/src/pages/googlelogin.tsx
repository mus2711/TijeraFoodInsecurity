import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useMeQuery, usePostsQuery } from "../generated/graphql";
import React from "react";
import { Layout } from "../components/layout";
import { useState } from "react";
import GoogleLogin from "react-google-login";
import { FaFileCode } from "react-icons/fa";
import { Container, Flex } from "@chakra-ui/react";
import { GoogleAuth } from "google-auth-library";
import { EditSection } from "../components/EditSection";
import { Navbar } from "../components/navbar";
import { Musgoogle } from "../components/gglogin";

function googleLogin(): any {
  const [variables, setVariables] = useState({
    limit: 15,
    cursor: null as null | string,
  });
  const [{ data: meData }] = useMeQuery();

  const [{ data, fetching }] = usePostsQuery({ variables });

  // console.log("var: ", variables);
  const handleLogin = (result: any) => {
    alert(result);
  };
  const handleFailure = (googleData: any) => {
    console.log(googleData);
  };
  const responseGoogle = (response: any) => {
    console.log(response);
  };

  return (
    <Flex direction={"row"} width={"100vw"}>
      {/* <h1>Hello</h1>
      <Navbar title="hello"></Navbar> */}
      {/* <Musgoogle title_log="okay"></Musgoogle> */}
      <text>hello</text>
    </Flex>
  );
}

export default withUrqlClient(createUrqlClient, { ssr: true })(googleLogin);
