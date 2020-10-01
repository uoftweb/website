import { Box, Heading, Stack, Text } from "@chakra-ui/core";
import Head from "next/head";

import { Container } from "../components/Container";
import { PageHeader } from "../components/PageHeader";
import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function WorkshopsPage() {
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
          </Stack>
        </Container>
      </Box>
    </>
  );
}
