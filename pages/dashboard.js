import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function DashboardPage() {
  return (
    <>
      <SiteNavigationBar />

      <Box as="section" py={32}>
        <Box maxW="3xl" mx="auto" px={3}>
          <Stack spacing={3}>
            <Heading>Dashboard</Heading>
            <Text>Messages</Text>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
