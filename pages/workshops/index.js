import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/core";
import Head from "next/head";
import NextLink from "next/link";

import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";
import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { WorkshopCard } from "../../components/WorkshopCard";
import { getWorkshops } from "../../lib/workshops";

export async function getStaticProps() {
  const workshops = await getWorkshops();
  return { props: { workshops } };
}

export default function WorkshopsPage({ workshops }) {
  return (
    <>
      <Head>
        <title>Workshops | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <PageHeader title="Workshops" />

      <Box as="section" py={16}>
        <Container>
          <Stack spacing={3}>
            <Heading>Workshops</Heading>
            <Text>
              Build and learn how to use the latest web technology with our
              amazing workshop instructors.
            </Text>
            <Grid templateColumns="1fr 1fr" gap={3} mt={5}>
              {workshops.map((w) => (
                <NextLink key={w.slug} href={`/workshops/${w.slug}`} passHref>
                  <Box as="a">
                    <WorkshopCard workshop={w} />
                  </Box>
                </NextLink>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
