import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    brand: {
      50: "#dfeeff",
      100: "#b0cbff",
      200: "#7ea8ff",
      300: "#4b86ff",
      400: "#1a63ff",
      500: "#004ae6",
      600: "#0039b4",
      700: "#002982",
      800: "#001951",
      900: "#000821",
    },
    accent: {
      50: "#e1ffec",
      100: "#b8f6d1",
      200: "#8fefb4",
      300: "#64e898",
      400: "#3ae17c",
      500: "#23c862",
      600: "#179b4c",
      700: "#0c6f35",
      800: "#03431e",
      900: "#001806",
    },
  },
  fonts: {
    body: "Inter, system-ui, sans-serif",
    heading: "Inter, system-ui, sans-serif",
    mono: "'Fira Code', Menlo, monospace",
  },
  radii: {
    xl: "1.0rem",
    "2xl": "2.0rem",
    "3xl": "3.0rem",
  },
});
export default theme;
