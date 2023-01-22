import { createMultiStyleConfigHelpers } from "@chakra-ui/react";
import { checkboxAnatomy } from "@chakra-ui/anatomy";

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys);

const baseStyle = definePartsStyle({
  control: { rounded: "md" },
});

const CustomCheckbox = defineMultiStyleConfig({ baseStyle });

export default CustomCheckbox;
