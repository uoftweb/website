import { Box, Heading, Stack, Text } from "@chakra-ui/core";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function HomePage() {
  return (
    <>
      <SiteNavigationBar />

      <Box as="section" py={32}>
        <Box maxW="3xl" mx="auto" px={3}>
          <Stack spacing={3}>
            <Heading>Home</Heading>
            <Text>
              Welcome to the <strong>UofT Web Development Club</strong> website!
              Here you'll learn all about web design and development from the
              basics of HTML, CSS, and Javascript to more advanced topics like
              JS frameworks, cloud deployment, domains, and more.
            </Text>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
