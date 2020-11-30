import { Box, Heading, Icon, Link, Stack } from "@chakra-ui/react";
import NextLink from "next/link";

import { useColorModeValue } from "hooks/chakra";
import { BlueBall } from "./Ball";

export function PageHeader({ title, back }) {
  const bg = useColorModeValue("brand.600", "brand.900");
  return (
    <Box
      as="header"
      px={8}
      py={4}
      bg={bg}
      color="white"
      boxShadow="sm"
      overflow="hidden"
    >
      {back && (
        <Box mb={4}>
          <NextLink href={back} passHref>
            <Link>
              <Icon name="arrow-back" />
              Back
            </Link>
          </NextLink>
        </Box>
      )}
      <Stack isInline align="center" spacing={-10}>
        <Box position="relative" size={16}>
          <BlueBall size={16} position="absolute" top={0} left={0} zIndex="1" />
          <BlueBall
            size={6}
            position="absolute"
            bottom={-8}
            right={-4}
            zIndex="0"
          />
          <BlueBall
            size={4}
            position="absolute"
            top={-1}
            left={-1}
            zIndex="2"
          />
        </Box>
        <Heading as="h1" fontSize="3xl" zIndex="1" letterSpacing="tight">
          {title}
        </Heading>
      </Stack>
    </Box>
  );
}

export function LargePageHeader({ title }) {
  const bg = useColorModeValue("brand.600", "brand.900");
  return (
    <Box
      as="header"
      px={8}
      pt={16}
      pb={24}
      bg={bg}
      backgroundImage="radial-gradient(18.92% 104.2% at 50% 123.8%, #216BFF 0%, rgba(33, 107, 255, 0) 100%), linear-gradient(0deg, #041050, #041050)"
      color="white"
      boxShadow="sm"
      overflow="hidden"
      position="relative"
      zIndex="0"
    >
      <BlueBall
        size={64}
        position="absolute"
        bottom="-100%"
        left="calc(50% - 8rem)"
        zIndex="-1"
      >
        <BlueBall size={6} position="absolute" top={-55} left={20} />

        <BlueBall size={16} position="absolute" top={-100} right={-100} />
        <BlueBall size={8} position="absolute" top={-5} right={-150} />
        <BlueBall size={10} position="absolute" top={-50} right={-250} />
        <BlueBall size={4} position="absolute" top={-70} right={-350} />
        <BlueBall size={3} position="absolute" top={-20} right={-410} />

        <BlueBall size={12} position="absolute" top={-120} left={-60} />
        <BlueBall size={16} position="absolute" top={-30} left={-156} />
        <BlueBall size={6} position="absolute" top={-70} left={-228} />
        <BlueBall size={3} position="absolute" top={-20} left={-300} />
      </BlueBall>

      <Heading as="h1" fontSize="4xl" letterSpacing="tight" textAlign="center">
        {title}
      </Heading>
    </Box>
  );
}
