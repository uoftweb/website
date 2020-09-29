import { useColorMode } from "@chakra-ui/core";

export function useColorModeValue(light, dark) {
  const { colorMode } = useColorMode();
  return colorMode === "light" ? light : dark;
}
