import { Box, Heading, Icon, Link } from "@chakra-ui/core";
import NextLink from "next/link";

import { useColorModeValue } from "hooks/chakra";

export function PageHeader({ title, back }) {
  const bg = useColorModeValue("white", "brand.700");

  return (
    <Box py={5} px={8} bg={bg} boxShadow="sm">
      {back && (
        <Box mb={2}>
          <NextLink href={back} passHref>
            <Link>
              <Icon name="arrow-back" />
              Back
            </Link>
          </NextLink>
        </Box>
      )}
      <Heading as="h1" size="lg">
        {title}
      </Heading>
    </Box>
  );
}
