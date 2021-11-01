import { CheckCircleIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import NextLink from "next/link";

import { BlueBall, GreenBall, OrangeBall, TealBall } from "../components/Ball";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNavigationBar } from "../components/SiteNavigationBar";
import { siteConfig } from "../configs/site";
import { getSanityContent } from "../lib/sanityUtil";

export async function getStaticProps() {
  const data = await getSanityContent({
    query: `
      query AllPublishedArticles {
        allArticle(
          where: { publishedAt: { gt: "0000-01-01T00:00:00.000Z" } }
          sort: { publishedAt: ASC }
        ) {
          title
          slug {
            current
          }
          excerpt
          publishedAt
        }
      }    
    `,
  });
  const articles = data.allArticle.map((a) => ({ ...a, slug: a.slug.current }));
  return { props: { articles } };
}

function Message({ name, text, accent = false, ...props }) {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("gray.700", "gray.300");

  return (
    <Stack
      spacing={2}
      color={accent ? "white" : color}
      bg={accent ? "brand.600" : bg}
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      fontSize="xl"
      {...props}
    >
      <Text
        as="h3"
        color={accent ? "accent.300" : "brand.300"}
        fontWeight="medium"
      >
        {name}
      </Text>
      <Text>{text}</Text>
    </Stack>
  );
}

function HeroSection() {
  const bgImage = useColorModeValue(
    "linear-gradient(180deg, #0821A8 0%, #08142D 100%)",
    "linear-gradient(180deg,#03143b 0%,#000612 100%)"
  );
  const color = useColorModeValue("brand.50", "brand.200");

  const ballBgImage = useColorModeValue(
    "radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%), linear-gradient(216.53deg, #739BEC 14.79%, #216BFF 29.44%, #020F53 85.11%)",
    "radial-gradient(50% 50% at 50% 50%,rgba(33,107,255,0) 79.17%,rgb(171 199 255 / 11%) 100%), linear-gradient(216.53deg,#345aa6 14.79%,#113681 29.44%,#010624 85.11%)"
  );

  return (
    <Box
      as="section"
      py={32}
      minH="100vh"
      bgImage={bgImage}
      color={color}
      textAlign="center"
      overflow="hidden"
    >
      <Box maxW="3xl" mx="auto" px={3}>
        <Stack spacing={16} align="center">
          <Flex
            align="center"
            justify="center"
            w={["sm", "md", "lg", "lg"]}
            h={["sm", "md", "lg", "lg"]}
            bgImage={ballBgImage}
            borderRadius="full"
            position="relative"
            p={[16, 20, 24, 24]}
          >
            <Box as="img" src="/logo.svg" width="100%" />

            {/* Other balls */}
            <GreenBall
              size={32}
              blur={4}
              position="absolute"
              right="-8%"
              top="-2%"
            />
            <BlueBall
              size={48}
              blur={20}
              position="absolute"
              left="-70%"
              bottom={-16}
            />
            <BlueBall
              size={10}
              blur={5}
              position="absolute"
              top="0%"
              left="-50%"
            />
            <OrangeBall
              size={6}
              blur={5}
              position="absolute"
              bottom="-20%"
              right="0%"
            />
            <BlueBall
              size={20}
              blur={1}
              position="absolute"
              top="50%"
              right="-50%"
            />
            <TealBall
              size={5}
              blur={8}
              position="absolute"
              top="0%"
              right="-50%"
            />
            <TealBall
              size={5}
              blur={5}
              position="absolute"
              bottom="-40%"
              left="-20%"
            />
          </Flex>
          <Stack spacing={2} align="center">
            <Heading
              as="h1"
              fontSize="5xl"
              fontWeight="semibold"
              letterSpacing="tighter"
              lineHeight="shorter"
              bg="white"
              bgImage="linear-gradient(243.27deg, #E8F552 -0.15%, #1FF6E9 47.65%, #F68AF1 101.83%)"
              bgSize="100%"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                MozBackgroundClip: "text",
                MozTextFillColor: "transparent",
              }}
            >
              Web Dev Club
            </Heading>
            <Text
              fontSize="xl"
              maxW="md"
              letterSpacing="tight"
              lineHeight="shorter"
            >
              Join our collective of student designers, developers, and creators
              today
            </Text>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

function DiscordSection() {
  const bg = useColorModeValue("accent.300", "brand.900");
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
        <Stack
          spacing={6}
          maxW="2xl"
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Stack spacing={3}>
            <Heading>Join the conversation on Discord</Heading>
            <Text fontSize="lg">
              Become a part of our <strong>growing community</strong>! Get help
              with projects you’re working on and keep in touch with like-minded
              individuals.
            </Text>
          </Stack>
          <Stack isInline>
            <Button
              as="a"
              href={siteConfig.discord.url}
              size="lg"
              variant="link"
              colorScheme="brand"
            >
              Go to Discord
            </Button>
          </Stack>
        </Stack>

        <Stack
          spacing={-3}
          minW="lg"
          px={6}
          display={{ base: "none", lg: "block" }}
        >
          <Message
            name="Umar"
            text="Hey, what do you think about Svelte?"
            transform="rotateZ(1deg) translateX(20px)"
          />
          <Message
            name="Max"
            text="👀 It’s the future man! Are you still using React?!?!?"
            accent
            transform="rotateZ(-1deg) translateX(-20px)"
            zIndex="1"
          />
          <Message
            name="Umar"
            text="Yea....SIGH 😔. Maybe I can convince my boss to switch 🤔🤔🤔"
            transform="rotateZ(1deg)  translateX(20px)"
          />
        </Stack>
      </Stack>
    </Box>
  );
}

function WorkshopSection() {
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
        <Stack
          spacing={6}
          maxW="2xl"
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Stack spacing={3}>
            <Box>
              <Badge variant="solid" colorScheme="accent">
                Available Now
              </Badge>
            </Box>
            <Heading>Build new skills every month</Heading>
            <Text fontSize="lg">
              Attend our <strong>workshops</strong> and learn from our{" "}
              <strong>talented instructors</strong> within the community and
              level-up your web dev skills with us.
            </Text>
          </Stack>
          <Stack isInline>
            <NextLink href="/workshops" passHref>
              <Button as="a" size="lg" variant="link" colorScheme="brand">
                Learn More
              </Button>
            </NextLink>
          </Stack>
        </Stack>

        <Box maxW="md" p={6} display={{ base: "none", lg: "block" }}>
          <Box position="relative" w="100%">
            <Box
              position="absolute"
              top={0}
              left={0}
              w="100%"
              h="100%"
              transform="rotateZ(6deg)"
              borderRadius="2xl"
              boxShadow="lg"
              bgImage="linear-gradient(221.84deg, #6BE99D 2.35%, #2AB1EB 96.6%)"
            />
            <Stack
              position="relative"
              bg="brand.700"
              color="brand.100"
              borderRadius="2xl"
              boxShadow="lg"
              p={8}
              spacing={6}
              fontSize="xl"
              letterSpacing="tight"
              w="100%"
            >
              <Heading
                as="h3"
                color="white"
                fontWeight="normal"
                lineHeight="none"
              >
                2 Semesters
                <Text
                  as="span"
                  display="block"
                  fontWeight="bold"
                  bgImage="linear-gradient(261.22deg, #6BE99D 4.04%, #2AB1EB 98.62%)"
                  bgSize="100%"
                  style={{
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    MozBackgroundClip: "text",
                    MozTextFillColor: "transparent",
                  }}
                >
                  6 Workshops
                </Text>
              </Heading>
              <Text>
                We’re planning on running as many workshops as we can this
                school year on topics like:
              </Text>
              <List as="ul" color="white" pl={4}>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="accent.400" size={4} />
                  React
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="accent.400" size={4} />
                  Fullstack Fundamentals
                </ListItem>
                <ListItem>
                  <ListIcon as={CheckCircleIcon} color="accent.400" size={4} />
                  Next.js
                </ListItem>
              </List>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

export default function HomePage({ articles }) {
  return (
    <>
      <NextSeo title="Home" />

      <SiteNavigationBar />

      <HeroSection />
      <WorkshopSection />
      <DiscordSection />

      <SiteFooter />
    </>
  );
}
