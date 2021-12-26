import { VStack, InputGroup, Flex } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { initial } from "lodash";
import router from "next/router";
import { toErrorMap } from "../../utils/toErrorMap";
import {
  Exact,
  RegisterInput,
  Scalars,
  useRegisterMutation,
} from "../generated/graphql";
import register from "../pages/register";
import { DblStandardButton } from "./DblStandardButton";
import { Inputfield } from "./inputfield";
import { SignInOptions } from "./SignInOptions";

interface Formiksectionprops {
  //   inputValues: Exact<{
  //         firstname: string,
  //         lastname: string,
  //         username: string,
  //         email: string,
  //         password: string,
  //       }>
  inputValues: Exact<{
    username: string;
    password: string;
    email: string;
    firstname: string;
    lastname: string;
  }>;
}

export const Formiksection: React.FC<Formiksectionprops> = ({
  inputValues,
}) => {
  const [, register] = useRegisterMutation();

  return (
    <Formik
      initialValues={{ inputValues }}
      onSubmit={async (values, { setErrors }) => {
        console.log(values);
        const response = await register(values);
        console.log(response);
        if (response.data?.register.errors) {
          setErrors(toErrorMap(response.data.register.errors));
        } else if (response.data?.register.user) {
          router.push("/");
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <VStack spacing={4}>
            <InputGroup>
              <Inputfield
                name="firstname"
                placeholder="First Name*"
                label="First Name"
                // left={<HiUser color="gray.300" />}
              />
            </InputGroup>

            <InputGroup>
              <Inputfield
                name="lastname"
                placeholder="Last Name*"
                label="Last Name"
                // width={"75vw"}
                // maxWidth={"350px"}
              />
            </InputGroup>
            <InputGroup>
              {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<HiUser />}
                    /> */}
              <Inputfield
                name="username"
                placeholder="Username*"
                label="Username"
                // width={"75vw"}
                // maxWidth={"350px"}
              />
            </InputGroup>
            <InputGroup>
              {/* <InputLeftElement
                      pointerEvents="none"
                      color="gray.300"
                      fontSize="1.2em"
                      children={<MdEmail color="gray.300" />}
                    /> */}
              <Inputfield
                name="email"
                placeholder="johndoe@email.com*"
                label="Email"
                // width={"75vw"}
                // maxWidth={"350px"}
              />
            </InputGroup>
            <InputGroup>
              <Inputfield
                name="password"
                placeholder="Password*"
                label="Password"
                type="password"
              />
            </InputGroup>
            <InputGroup>
              <Inputfield
                name="password_re"
                placeholder="Re-type Password*"
                label="Password"
                type="password"
              />
            </InputGroup>
          </VStack>

          <DblStandardButton
            title="Next"
            route="/register_3"
            routeback="register_1"
            widthforward="62vw"
          />
          <Flex
            direction={"column"}
            mt={6}
            alignItems={"center"}
            justifyContent={"center"}
          ></Flex>
        </Form>
      )}
    </Formik>
  );
};
