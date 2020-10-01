import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { Container } from "../components/Container";
import { PageHeader } from "../components/PageHeader";
import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function DashboardPage() {
  return (
    <>
      <SiteNavigationBar />

      <PageHeader title="Dashboard" />

      <Box as="section" py={16}>
        <Container>
          <Stack spacing={3}>
            <Heading>Dashboard</Heading>
            <Text>Messages</Text>
          </Stack>
        </Container>
      </Box>
    </>
  );
}
