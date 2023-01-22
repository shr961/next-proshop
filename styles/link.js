import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({ _hover: { textDecor: "none" } });

const CustomLink = defineStyleConfig({
  baseStyle,
});

export default CustomLink;
