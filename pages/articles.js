import Head from "next/head";
import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function Articles() {
  return (
    <>
      <Head>
        <title>Articles | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <Box as="section" p={16}>
        <Stack spacing={3}>
          <Heading>Articles</Heading>
          <Text>
            We write about topics related to web development from time to time.
            Have a read and let us know what you think
          </Text>
        </Stack>
      </Box>
    </>
  );
}
