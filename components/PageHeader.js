import { Box, Heading } from "@chakra-ui/core";

import { useColorModeValue } from "hooks/chakra";

export function PageHeader({ title }) {
  const bg = useColorModeValue("white", "brand.700");

  return (
    <Box py={5} px={8} bg={bg} boxShadow="sm">
      <Heading as="h1" size="lg">
        {title}
      </Heading>
    </Box>
  );
}
