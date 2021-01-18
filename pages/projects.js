import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { BlueBall, GlowingTealBall } from "../components/Ball";

import { Container } from "../components/Container";
import { PageHeader } from "../components/PageHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNavigationBar } from "../components/SiteNavigationBar";

function ProjectPageHeader() {
  const bg = useColorModeValue("brand.600", "brand.900");
  return (
    <Box
      as="header"
      pt={16}
      pb={24}
      bg={bg}
      backgroundImage="linear-gradient(0deg, #041050, #041050)"
      boxShadow="sm"
      overflow="hidden"
      position="relative"
      zIndex="0"
    >
      <Container
        as={Stack}
        spacing={16}
        direction={{ base: "column-reverse", lg: "row" }}
      >
        <Stack
          spacing="32px"
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
          maxW={{ base: "full", lg: "sm" }}
        >
          <Stack spacing="16px" align={{ base: "center", lg: "flex-start" }}>
            <Badge variant="solid" colorScheme="accent">
              Now Accepting Applications
            </Badge>

            <Heading
              as="h1"
              fontSize="4xl"
              fontWeight="semibold"
              letterSpacing="tight"
              color="white"
            >
              Bring your idea to life
            </Heading>

            <Text color="brand.200">
              Over the course of the <strong>winter semester</strong>, we’ll
              help you turn your project from an idea into a polished product
              that you can share with the world!
            </Text>
          </Stack>

          <Stack spacing="16px" align={{ base: "center", lg: "flex-start" }}>
            <Button
              as="a"
              variant="solid"
              color="brand.600"
              width={{ base: "full", lg: "unset" }}
            >
              Apply Now
            </Button>

            <Text color="brand.300" fontSize="xs">
              Applications close <strong>January 25th</strong> and will be
              considered on a rolling basis
            </Text>
          </Stack>
        </Stack>

        <Center flex="1" position="relative">
          <Box
            position="absolute"
            left="0"
            top="0"
            width="100%"
            height="100%"
            backgroundImage="radial-gradient(50% 50.2% at 50% 50%, #216BFF 0%, rgba(33, 107, 255, 0) 100%)"
          ></Box>
          <BlueBall size={60} position="relative">
            <Box
              as="img"
              src="/images/lightbulb.svg"
              position="absolute"
              left="calc((100% - 150px) / 2)"
              top="calc((100% - 150px) / 2)"
              width="150px"
              height="150px"
            ></Box>
            <BlueBall size={3} position="absolute" top="148px" left="-270px" />
            <GlowingTealBall
              size={5}
              position="absolute"
              top="80px"
              left="-183px"
            />
            <BlueBall size={6} position="absolute" top="106px" left="-105px" />
            <BlueBall size={16} position="absolute" top="168px" left="-112px" />
            <BlueBall size={8} position="absolute" top="52px" left="-50px" />

            <BlueBall size={6} position="absolute" top="180px" right="-50px" />
            <BlueBall size={6} position="absolute" top="140px" right="-120px" />
            <GlowingTealBall
              size={16}
              position="absolute"
              top="30px"
              right="-120px"
            />
            <GlowingTealBall
              size={4}
              position="absolute"
              top="180px"
              right="-170px"
            />
            <BlueBall size={10} position="absolute" top="85px" right="-220px" />
          </BlueBall>
        </Center>
      </Container>
    </Box>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <NextSeo title="Projects" />

      <SiteNavigationBar />

      <ProjectPageHeader />

      <Box as="section" py={16}>
        <Container>
          <Stack spacing={3}>
            <Heading>Projects</Heading>
            <Text>
              Work on a cool project for 16 weeks and showcase your talents.
            </Text>
          </Stack>
        </Container>
      </Box>

      <SiteFooter />
    </>
  );
}
