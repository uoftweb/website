import {
  AspectRatioBox,
  Box,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from "@chakra-ui/core";
import Head from "next/head";

import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";
import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { getWorkshopPaths, getWorkshops } from "../../lib/workshops";

export async function getStaticPaths() {
  const workshopPaths = await getWorkshopPaths();
  const paths = workshopPaths.map((p) => ({ params: { slug: p.slug } }));
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const workshops = await getWorkshops();
  const workshop = workshops.find((w) => w.slug === params.slug);
  return { props: { workshop } };
}

export default function WorkshopPage({ workshop }) {
  const startDate = new Date(Date.parse(workshop.start));
  const endDate = new Date(Date.parse(workshop.end));
  const format = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return (
    <>
      <Head>
        <title>{workshop?.title} | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <PageHeader title={workshop?.title} back="/workshops" />

      {workshop?.youtubeId && (
        <Box as="section" bg="black">
          <AspectRatioBox maxW="6xl" ratio={16 / 9} mx="auto">
            <Box
              as="iframe"
              title={workshop?.title}
              src={`https://www.youtube.com/embed/${workshop?.youtubeId}`}
              allowFullScreen
            />
          </AspectRatioBox>
        </Box>
      )}

      <Box as="section" py={16}>
        <Container>
          <Stack spacing={3}>
            <Heading as="h1">{workshop?.title ?? "Untitled Workshop"}</Heading>
            <Flex mt="2" align="center">
              <Icon name="calendar" color="teal.500" />
              <Text as="span" ml={2} color="gray.600" fontSize="sm">
                {format.formatRange(startDate, endDate)}
              </Text>
            </Flex>
            <Text>{workshop?.excerpt}</Text>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
