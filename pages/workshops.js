import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function Workshops() {
  return (
    <>
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
