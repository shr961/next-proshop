import { extendTheme, theme as th } from "@chakra-ui/react";

import CustomButton from "./button";
import CustomInput from "./input";
import CustomLink from "./link";
import CustomTag from "./tag";
import CustomCheckbox from "./checkbox";

const styles = {
  global: (props) => ({
    "html, body": {
      overflowX: "hidden",
      minH: "100vh",
      position: "relative",
    },

    body: {
      bgColor: "white",
      color: "neutral.600",
    },
  }),
};

const components = {
  Button: CustomButton,
  Link: CustomLink,
  Input: CustomInput,
  Tag: CustomTag,
  Checkbox: CustomCheckbox,
};

const theme = extendTheme({
  direction: "rtl",
  config: { initialColorMode: "light", useSystemColorMode: false },
  fonts: {
    body: "Shabnam, sans-serif",
    heading: "Shabnam, sans-serif",
  },
  colors: {
    brand: { ...th.colors.cyan },
    slate: {
      50: "#F8FAFC",
      100: "#F1F5F9",
      200: "#E2E8F0",
      300: "#CBD5E1",
      400: "#94A3B8",
      500: "#64748B",
      600: "#475569",
      700: "#334155",
      800: "#1E293B",
      900: "#0F172A",
    },

    neutral: {
      50: "#FAFAFA",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#737373",
      600: "#525252",
      700: "#404040",
      800: "#262626",
      900: "#171717",
    },

    amber: {
      50: "#FFFBEB",
      100: "#FEF3C7",
      200: "#FDE68A",
      300: "#FCD34D",
      400: "#FBBF24",
      500: "#F59E0B",
      600: "#D97706",
      700: "#B45309",
      800: "#92400E",
      900: "#78350F",
    },

    lime: {
      50: "#F7FEE7",
      100: "#ECFCCB",
      200: "#D9F99D",
      300: "#BEF264",
      400: "#A3E635",
      500: "#84CC16",
      600: "#65A30D",
      700: "#4D7C0F",
      800: "#3F6212",
      900: "#365314",
    },

    emerald: {
      50: "#ECFDF5",
      100: "#D1FAE5",
      200: "#A7F3D0",
      300: "#6EE7B7",
      400: "#34D399",
      500: "#10B981",
      600: "#059669",
      700: "#047857",
      800: "#065F46",
      900: "#064E3B",
    },

    indigo: {
      50: "#EEF2FF",
      100: "#E0E7FF",
      200: "#C7D2FE",
      300: "#A5B4FC",
      400: "#818CF8",
      500: "#6366F1",
      600: "#4F46E5",
      700: "#4338CA",
      800: "#3730A3",
      900: "#312E81",
    },

    rose: {
      50: "#FFF1F2",
      100: "#FFE4E6",
      200: "#FECDD3",
      300: "#FDA4AF",
      400: "#FB7185",
      500: "#F43F5E",
      600: "#E11D48",
      700: "#BE123C",
      800: "#9F1239",
      900: "#881337",
    },

    fuchsia: {
      50: "#FDF4FF",
      100: "#FAE8FF",
      200: "#F5D0FE",
      300: "#F0ABFC",
      400: "#E879F9",
      500: "#D946EF",
      600: "#C026D3",
      700: "#A21CAF",
      800: "#86198F",
      900: "#701A75",
    },
  },
  components,
  styles,
});

export default theme;
