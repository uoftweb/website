import { Box, Heading, Stack, Text } from "@chakra-ui/core";
import Head from "next/head";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function WorkshopsPage() {
  return (
    <>
      <Head>
        <title>Workshops | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <Box as="section" p={16}>
        <Stack spacing={3}>
          <Heading>Workshops</Heading>
          <Text>
            Build and learn how to use the latest web technology with our
            amazing workshop instructors.
          </Text>
        </Stack>
      </Box>
    </>
  );
}
