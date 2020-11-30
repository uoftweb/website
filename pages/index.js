import { gql, useQuery } from "@apollo/client";
import {
  Badge,
  Box,
  Button,
  Code,
  Flex,
  Heading,
  Link,
  List,
  ListIcon,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import NextLink from "next/link";

import { BlueBall, GreenBall, OrangeBall, TealBall } from "../components/Ball";
import { SiteNavigationBar } from "../components/SiteNavigationBar";
import { siteConfig } from "../configs/site";
import { useColorModeValue } from "../hooks/chakra";
import { getArticles } from "../lib/articles";

export async function getStaticProps() {
  const articles = await getArticles();
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
            size={["sm", "md", "lg", "lg"]}
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

const DiscordIcon = (props) => (
  <svg viewBox="0 0 146 146" style={{ height: "1em", width: "1em" }} {...props}>
    <path
      fill="currentColor"
      d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
      fillRule="nonzero"
    />
  </svg>
);

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
              variantColor="brand"
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
              <Badge variant="solid" variantColor="accent">
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
              <Button as="a" size="lg" variant="link" variantColor="brand">
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
                  <ListIcon icon="check-circle" color="accent.400" size={4} />
                  React
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="accent.400" size={4} />
                  Fullstack Fundamentals
                </ListItem>
                <ListItem>
                  <ListIcon icon="check-circle" color="accent.400" size={4} />
                  Next.js
                </ListItem>
              </List>
              <Button
                onClick={() =>
                  signIn(undefined, {
                    callbackUrl: `${window.location.origin}/workshops`,
                  })
                }
                variant="solid"
                variantColor="brand"
              >
                Sign up now
              </Button>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
}

function ArticleCard({
  title = "Article Title",
  stars = 0,
  excerpt = "Excerpt",
  href = "#",
  bgImage,
}) {
  return (
    <Box maxW="lg" p={6}>
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
          bgImage={bgImage}
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
          <Stack>
            <Heading
              as="h3"
              color="white"
              fontWeight="normal"
              lineHeight="none"
            >
              {title}
            </Heading>
            <Text
              as="span"
              fontWeight="bold"
              bgImage={bgImage}
              bgSize="100%"
              style={{
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                MozBackgroundClip: "text",
                MozTextFillColor: "transparent",
              }}
            >
              {stars} stars
            </Text>
          </Stack>
          <Text>{excerpt}</Text>
          <NextLink href={href} passHref>
            <Button as="a" variant="solid" variantColor="brand">
              Read now
            </Button>
          </NextLink>
        </Stack>
      </Box>
    </Box>
  );
}

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      slug
      stargazers {
        id
      }
    }
  }
`;

function ArticleSection({ articles }) {
  const bg = useColorModeValue("white", "brand.800");
  const color = useColorModeValue("brand.600", "brand.50");
  const codeBg = useColorModeValue("brand.800", "brand.900");

  const { data } = useQuery(GET_ARTICLES);

  const articleDynamicData = data
    ? Object.fromEntries(data?.articles.map((a) => [a.slug, a]))
    : {};

  const featuredArticles = articles.slice(0, 2);

  return (
    <Box as="section" py={{ base: 16, lg: 32 }} bg={bg} color={color}>
      <Stack
        spacing={{ base: 8, lg: 16 }}
        maxW="80rem"
        mx="auto"
        px={3}
        align="center"
        justify={{ base: "center", lg: "flex-start" }}
      >
        <Stack spacing={3} textAlign="center" align="center">
          <Heading>Take a deep-dive into foundational web dev concepts</Heading>
          <Text fontSize="lg" maxW="3xl">
            Check out some of the <strong>articles</strong> we’ve written on
            different topics like Javascript fundamentals and cool CSS tricks!
          </Text>
        </Stack>

        <Stack spacing={4} align="center">
          <Code
            bg={codeBg}
            color="brand.50"
            fontSize={{ base: "sm", sm: "xl", md: "2xl" }}
            py={3}
            px={5}
            borderRadius="lg"
            fontWeight="medium"
            letterSpacing="tighter"
            whiteSpace="nowrap"
          >
            <Text as="span" color="accent.400">
              $
            </Text>{" "}
            curl /articles | sort -k 2 | head -n 2
          </Code>
          <Text fontSize="sm" color="gray.500" textAlign="center">
            Wondering what this means? Read our{" "}
            <NextLink href="/articles/bash-tutorial">
              <Link fontWeight="semibold">Bash Tutorial</Link>
            </NextLink>{" "}
            to learn more
          </Text>
        </Stack>

        <Stack isInline flexWrap="wrap" justify="center">
          {featuredArticles?.map((article, index) => (
            <ArticleCard
              key={article.slug}
              title={article.frontmatter.title}
              stars={articleDynamicData[article.slug]?.stargazers.length}
              excerpt={article.frontmatter.excerpt}
              href={`/articles/${article.slug}`}
              bgImage={
                index % 2 === 0
                  ? "linear-gradient(261.22deg, #6BE99D 4.04%, #2AB1EB 98.62%)"
                  : "linear-gradient(221.84deg, #E96B6B 2.35%, #EBCC2A 96.6%)"
              }
            />
          ))}
        </Stack>

        <NextLink href="/articles" passHref>
          <Button as="a" variant="ghost">
            Read More
          </Button>
        </NextLink>
      </Stack>
    </Box>
  );
}

export default function HomePage({ articles }) {
  return (
    <>
      <SiteNavigationBar />
      <HeroSection />
      <WorkshopSection />
      <ArticleSection articles={articles} />
      <DiscordSection />
    </>
  );
}
