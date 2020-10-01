import { Box, Heading, Stack, Text } from "@chakra-ui/core";
import Head from "next/head";

import { Container } from "../components/Container";
import { PageHeader } from "../components/PageHeader";
import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function ProjectsPage() {
  return (
    <>
      <Head>
        <title>Projects | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <PageHeader title="Projects" />

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
    </>
  );
}
