import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/core";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

function Message({ name, text, accent = false, ...props }) {
  return (
    <Stack
      spacing={2}
      color={accent ? "white" : "gray.700"}
      bg={accent ? "brand.600" : "white"}
      borderRadius="lg"
      boxShadow="lg"
      p={6}
      fontSize="xl"
      {...props}
    >
      <Text
        as="h3"
        color={accent ? "accent.300" : "brand.500"}
        fontWeight="medium"
      >
        {name}
      </Text>
      <Text>{text}</Text>
    </Stack>
  );
}

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

      <Box as="section" py={16} bg="accent.300" color="brand.600">
        <Stack
          isInline
          spacing={16}
          maxW="80rem"
          mx="auto"
          px={3}
          align="center"
          justify={{ base: "center", lg: "flex-start" }}
        >
          <Stack
            spacing={6}
            maxW="2xl"
            align={{ base: "center", lg: "flex-start" }}
            textAlign={{ base: "center", lg: "left" }}
          >
            <Stack spacing={3}>
              <Heading>Join the conversation on Discord</Heading>
              <Text fontSize="lg">
                Become a part of our <strong>growing community</strong>! Get
                help with projects you’re working on and keep in touch with
                like-minded individuals.
              </Text>
            </Stack>
            <Stack isInline>
              <Button size="lg">Go to Discord</Button>
            </Stack>
          </Stack>

          <Stack
            spacing={-3}
            minW="lg"
            px={6}
            display={{ base: "none", lg: "block" }}
          >
            <Message
              name="Umar"
              text="Hey, what do you think about Svelte?"
              transform="rotateZ(1deg) translateX(20px)"
            />
            <Message
              name="Max"
              text="👀 It’s the future man! Are you still using React?!?!?"
              accent
              transform="rotateZ(-1deg) translateX(-20px)"
              zIndex="1"
            />
            <Message
              name="Umar"
              text="Yea....SIGH 😔. Maybe I can convince my boss to switch 🤔🤔🤔"
              transform="rotateZ(1deg)  translateX(20px)"
            />
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
