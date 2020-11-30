import { useColorMode } from "@chakra-ui/react";

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? light : dark;
}
