import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

const baseStyle = definePartsStyle();

const filled = definePartsStyle({
  field: {
    fontSize: "sm",
    boxShadow: "md",
    bg: "white",
    border: "none",
    outlineWidth: 3,
    outlineOffset: 1,
    transition: "all 200ms ease",
    borderRadius: "xl",
    _focus: {
      border: "none",
      bg: "white",
      outlineColor: "cyan.600",
    },
    _hover: { bg: "neutral.50" },
    _invalid: { outlineColor: "rose.400" },
  },
});

const CustomInput = defineMultiStyleConfig({ baseStyle, variants: { filled } });

export default CustomInput;
