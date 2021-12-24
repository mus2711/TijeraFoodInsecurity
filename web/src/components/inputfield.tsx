import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";

type inputfieldProps = InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  left?: object;
  right?: object;
};

export const Inputfield: React.FC<inputfieldProps> = ({
  label,
  size: _,
  ...props
}) => {
  const [field, { error }] = useField(props);
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <InputGroup>
        {/* {props.left ? (
          <InputLeftElement children={props.left}></InputLeftElement>
        ) : null} */}
        <Input
          {...field}
          {...props}
          id={field.name}
          placeholder={props.placeholder}
        />
        {/* {props.right ? (
          <InputRightElement children={props.right}></InputRightElement>
        ) : null} */}
      </InputGroup>
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};
