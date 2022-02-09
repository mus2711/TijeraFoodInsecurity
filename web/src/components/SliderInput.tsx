import React from "react";
import {
  Badge,
  Box,
  Divider,
  HStack,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
} from "@chakra-ui/react";

type Props = {
  value: number;
  onChange: (val: number) => void;
  onChange2?: (val: string) => void;
  title: string;
  testId: string;
  targets: number[];
  min: number;
  max: number;
  unitL?: string;
  unitR: string;
  step?: number;
};

export const SliderInput = ({
  value,
  onChange,
  title,
  targets,
  max,
  min,
  unitL,
  unitR,
  step,
}: Props) => {
  return (
    <Box padding={"20px"}>
      <Badge marginTop={0} marginBottom={10} colorScheme={"black"}>
        {title}
      </Badge>
      <HStack spacing={10}>
        <Slider
          aria-label="slider-ex-6"
          onChange={onChange}
          max={max}
          min={min}
          step={step}
        >
          {targets.map((num) => (
            <SliderMark value={num} mt="4" ml="-20px" fontSize="sm">
              <Badge colorScheme={"black"}>{num}</Badge>
            </SliderMark>
          ))}
          <SliderMark
            value={value}
            textAlign="center"
            // color="white"
            mt="-10"
            ml={-unitR.length - 4}
          >
            <Badge colorScheme={"black"}>
              {unitL} {value} {unitR}
            </Badge>
          </SliderMark>
          <SliderTrack height={6} borderRadius={10}>
            <SliderFilledTrack
              p={2}
              height={4}
              borderRadius={10}
              bgColor={"cyan.300"}
            />
          </SliderTrack>
          <SliderThumb />
        </Slider>
      </HStack>
      <Divider paddingBottom={10} />
    </Box>
  );
};
