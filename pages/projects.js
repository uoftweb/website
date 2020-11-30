import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import { Container } from "../components/Container";
import { PageHeader } from "../components/PageHeader";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function ProjectsPage() {
  return (
    <>
      <NextSeo title="Projects" />

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

      <SiteFooter />
    </>
  );
}
