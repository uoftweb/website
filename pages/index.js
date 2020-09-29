import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function HomePage() {
  return (
    <>
      <SiteNavigationBar />

      <Box as="section" p={16}>
        <Stack spacing={3}>
          <Heading>Home</Heading>
          <Text>
            We write about topics related to web development from time to time.
            Have a read and let us know what you think
          </Text>
        </Stack>
      </Box>
    </>
  );
}
