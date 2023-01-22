import { defineStyle, defineStyleConfig } from "@chakra-ui/react";

const baseStyle = defineStyle({ borderRadius: "xl" });

const CustomButton = defineStyleConfig({
  baseStyle,
  defaultProps: { colorScheme: "neutral" },
});

export default CustomButton;
