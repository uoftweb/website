import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  List,
  ListIcon,
  ListItem,
  Icon,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { NextSeo } from "next-seo";
import NextLink from "next/link";

import { Container } from "../components/Container";
import { SiteFooter } from "../components/SiteFooter";
import { BlueBall, GlowingTealBall } from "../components/Ball";
import { SiteNavigationBar } from "../components/SiteNavigationBar";

const CircleIcon = (props) => (
  <Icon viewBox="0 0 72 72" {...props}>
    <linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient">
      <stop stop-color="#6BE99D" offset="0" />
      <stop stop-color="#2AB1EB" offset="100%" />
    </linearGradient>
    <circle fill="url(#gradient)" cx="36" cy="36" r="20" />
  </Icon>
);

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

function MentorSection() {
  const bg = useColorModeValue("brand.50", "brand.600");
  const color = useColorModeValue("brand.600", "brand.50");
  return (
    <Box as="section" py={16} bg={bg} color={color}>
      <Stack
        isInline
        spacing={{ base: 0, lg: 16 }}
        maxW="80rem"
        mx="auto"
        px={3}
        align="center"
        justify={{ base: "center", lg: "flex-start" }}
      >
        <Box maxW="md" p={8} display={{ base: "none", lg: "block" }}>
          <Box position="relative" w="100%">
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              transform="rotateZ(8deg)"
              borderRadius="2xl"
              boxShadow="lg"
              bg="gray.100"
            />
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              transform="rotateZ(-6deg)"
              borderRadius="2xl"
              boxShadow="lg"
              bg="gray.100"
            />
            <Stack
              position="relative"
              bg="white"
              color="brand.600"
              borderRadius="2xl"
              boxShadow="lg"
              fontSize="xl"
              letterSpacing="tight"
              w="100%"
              overflow="hidden"
              minW="sm"
              transform="rotateZ(-3deg)"
            >
              <Box as="img" src="https://picsum.photos/300/200" />
              <Stack p={8} spacing={6}>
                <Heading
                  as="h3"
                  fontWeight="semibold"
                  fontSize="3xl"
                  lineHeight="none"
                >
                  Umar Ahmed
                </Heading>
                <List as="ul" pl={6} spacing={2}>
                  <ListItem>
                    <ListIcon as={CircleIcon} boxSize={4} mb={1} />
                    React
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CircleIcon} boxSize={4} mb={1} />
                    Fullstack Fundamentals
                  </ListItem>
                  <ListItem>
                    <ListIcon as={CircleIcon} boxSize={4} mb={1} />
                    Next.js
                  </ListItem>
                </List>
              </Stack>
            </Stack>
          </Box>
        </Box>

        <Stack
          spacing={6}
          maxW="2xl"
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Stack spacing={3}>
            <Heading>Get one-on-one help from our team</Heading>
            <Text fontSize="lg">
              With help from our amazingly talented <strong>staff</strong> and{" "}
              <strong>network of mentors</strong>, we’ll help you jump through
              the various hoops of product development.
            </Text>
          </Stack>
          <Stack isInline>
            <NextLink href="/workshops" passHref>
              <Button as="a" size="lg" variant="link" colorScheme="brand">
                Meet the Team
              </Button>
            </NextLink>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

export default function ProjectsPage() {
  return (
    <>
      <NextSeo title="Projects" />

      <SiteNavigationBar />

      <ProjectPageHeader />

      <MentorSection />

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
