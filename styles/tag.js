import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { tagAnatomy } from "@chakra-ui/anatomy";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(tagAnatomy.keys);

const baseStyle = definePartsStyle({
  container: { rounded: "xl", boxShadow: "md" },
});

const CustomTag = defineMultiStyleConfig({
  baseStyle,
  defaultProps: { size: "sm" },
});

export default CustomTag;
