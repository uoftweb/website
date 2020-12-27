import { ArrowBackIcon, CalendarIcon, LockIcon } from "@chakra-ui/icons";
import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Icon,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import getYouTubeID from "get-youtube-id";
import { signIn, useSession } from "next-auth/client";
import { NextSeo } from "next-seo";
import NextLink from "next/link";
import { useState } from "react";

import { BlueBall } from "../../components/Ball";
import { Container } from "../../components/Container";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { getSanityContent } from "../../lib/getSanityContent";

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query AllWorkshops {
        allWorkshop {
          slug {
            current
          }
        }
      }
    `,
  });
  const paths = data.allWorkshop.map((w) => ({
    params: { slug: w.slug.current },
  }));
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const data = await getSanityContent({
    query: `
      query WorkshopBySlug($slug: String!) {
        allWorkshop(where: { slug: { current: {eq: $slug }}}) {
          title
          excerpt
          start
          end
          youtubeVideo {
            url
          }
          shownotes
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });
  const workshop = {
    ...data.allWorkshop[0],
    youtubeVideoUrl: data.allWorkshop[0].youtubeVideo.url,
  };
  return { props: { workshop } };
}

const format = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
});

export default function WorkshopPage({ workshop }) {
  const [session] = useSession();
  const [shouldPlay, setShouldPlay] = useState(false);

  const startDate = new Date(Date.parse(workshop.start));
  const endDate = new Date(Date.parse(workshop.end));
  const youtubeId = getYouTubeID(workshop?.youtubeVideoUrl);

  const bg = useColorModeValue("brand.600", "gray.700");
  const secondBg = useColorModeValue("brand.700", "gray.800");
  const cardBg = useColorModeValue("white", "gray.900");
  const cardColor = useColorModeValue("gray.800", "gray.50");

  return (
    <>
      <NextSeo title={workshop?.title} description={workshop?.excerpt} />

      <SiteNavigationBar />

      <Grid
        as="section"
        templateColumns={{
          base: "1fr",
          lg: "minmax(30ch, 60ch) minmax(500px, 1fr)",
        }}
        gap={16}
        p={[4, 8, 16]}
        bg={bg}
        color="white"
        alignItems="center"
      >
        <Stack spacing={6}>
          <Box mb={4}>
            <NextLink href="/workshops" passHref>
              <Link>
                <ArrowBackIcon />
                Back
              </Link>
            </NextLink>
          </Box>
          <Stack isInline align="center" spacing={-10}>
            <Box position="relative" w={16} h={16}>
              <BlueBall
                size={16}
                position="absolute"
                top={0}
                left={0}
                zIndex="1"
              />
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
              {workshop?.title ?? "Untitled Workshop"}
            </Heading>
          </Stack>
          <Stack spacing={3}>
            <Flex mt="2" align="center">
              <CalendarIcon color="teal.300" />
              <Text as="span" ml={2} color="brand.100" fontSize="sm">
                {format.format(startDate)} - {format.format(endDate)}
              </Text>
            </Flex>
            <Text fontSize="lg" lineHeight="tall">
              {workshop?.excerpt}
            </Text>
          </Stack>
          <Stack isInline>
            {session ? (
              <Button colorScheme="green" onClick={() => setShouldPlay(true)}>
                Watch
              </Button>
            ) : (
              <Button colorScheme="green" onClick={signIn}>
                Sign in to watch
              </Button>
            )}
            <Button colorScheme="purple">Discuss on Discord</Button>
          </Stack>
        </Stack>
        <Box width="100%">
          <AspectRatio
            ratio={16 / 9}
            mx="auto"
            overflow="hidden"
            borderRadius="lg"
            boxShadow="lg"
            bg="gray.900"
          >
            {session ? (
              <Box
                as="iframe"
                title={workshop?.title}
                frameborder="0"
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0${
                  shouldPlay ? "&autoplay=1" : ""
                }`}
                allowFullScreen
                allow="autoplay; encrypted-media"
              />
            ) : (
              <Box zIndex="0">
                <Box
                  as="img"
                  position="absolute"
                  opacity="0.3"
                  zIndex="-1"
                  style={{ filter: "blur(10px)" }}
                  transform="scale(1.1)"
                  src={`https://img.youtube.com/vi/${workshop?.youtubeId}/maxresdefault.jpg`}
                />
                <Stack
                  align="center"
                  justify="center"
                  w="full"
                  h="full"
                  spacing={4}
                >
                  <LockIcon size={16} />
                  <Text>
                    Sorry! This content is only available to registered members
                  </Text>
                  <Button colorScheme="green" onClick={signIn}>
                    Sign in to watch
                  </Button>
                </Stack>
              </Box>
            )}
          </AspectRatio>
        </Box>
      </Grid>

      <Box as="section" py={32} bg={secondBg} color="white">
        <Container>
          <Stack spacing={8}>
            <Heading as="h3" fontSize="2xl" letterSpacing="tight">
              Show Notes
            </Heading>
            <Box
              p={8}
              bg={cardBg}
              borderRadius="lg"
              boxShadow="md"
              color={cardColor}
            >
              {workshop?.shownotes
                ? workshop?.shownotes
                    ?.split("\n")
                    .map((line, i) => <p key={i}>{line}</p>)
                : "Not available"}
            </Box>
          </Stack>
        </Container>
      </Box>

      <SiteFooter />
    </>
  );
}
