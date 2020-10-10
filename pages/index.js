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

const Ball = ({ size = 24, blur = 0, ...props }) => (
  <Box
    position="absolute"
    size={size}
    style={{ filter: `blur(${blur}px)` }}
    bgImage="radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%),
linear-gradient(216.53deg, #739BEC 14.79%, #216BFF 29.44%, #020F53 85.11%)"
    borderRadius="full"
    {...props}
  />
);

const BlueBall = (props) => (
  <Ball
    bgImage="radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%),
linear-gradient(216.53deg, #739BEC 14.79%, #216BFF 29.44%, #020F53 85.11%)"
    {...props}
  />
);

const GreenBall = (props) => (
  <Ball
    bgImage="radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%),
linear-gradient(216.53deg, #D2FCE3 14.79%, #6BE99D 29.44%, #02451D 85.11%)"
    {...props}
  />
);

const OrangeBall = (props) => (
  <Ball
    bgImage="radial-gradient(50% 50% at 50% 50%, rgba(255, 140, 33, 0) 79.17%, rgba(255, 231, 171, 0.26) 100%),
linear-gradient(216.53deg, #DFBE2B 14.79%, #F49E5F 29.44%, #E06A66 85.11%)"
    {...props}
  />
);

const TealBall = (props) => (
  <Ball
    bgImage="radial-gradient(50% 50% at 50% 50%, rgba(33, 175, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%),
    linear-gradient(216.53deg, #AEE5FC 14.79%, #2AB1EB 29.44%, #013D57 85.11%)"
    {...props}
  />
);

export default function HomePage() {
  return (
    <>
      <SiteNavigationBar />

      {/* <Box as="section" py={32}>
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
      </Box> */}

      <Box
        as="section"
        py={32}
        minH="100vh"
        bgImage="linear-gradient(180deg, #0821A8 0%, #08142D 100%)"
        color="brand.50"
        textAlign="center"
        overflow="hidden"
      >
        <Box maxW="3xl" mx="auto" px={3}>
          <Stack spacing={16} align="center">
            <Flex
              align="center"
              justify="center"
              size={["sm", "md", "lg", "lg"]}
              bgImage="radial-gradient(50% 50% at 50% 50%, rgba(33, 107, 255, 0) 79.17%, rgba(171, 199, 255, 0.26) 100%),
              linear-gradient(216.53deg, #739BEC 14.79%, #216BFF 29.44%, #020F53 85.11%)"
              borderRadius="full"
              position="relative"
              p={[16, 20, 24, 24]}
            >
              <Box as="img" src="/logo.svg" width="100%" />

              {/* Other balls */}
              <GreenBall size={32} blur={4} right="-8%" top="-2%" />
              <BlueBall size={48} blur={20} left="-70%" bottom={-16} />
              <BlueBall size={10} blur={5} top="0%" left="-50%" />
              <OrangeBall size={6} blur={5} bottom="-20%" right="0%" />
              <BlueBall size={20} blur={1} top="50%" right="-50%" />
              <TealBall size={5} blur={8} top="0%" right="-50%" />
              <TealBall size={5} blur={5} bottom="-40%" left="-20%" />
            </Flex>
            <Stack spacing={2} align="center">
              <Heading
                as="h1"
                fontSize="5xl"
                fontWeight="semibold"
                letterSpacing="tighter"
                lineHeight="shorter"
                bg="white"
                bgImage="linear-gradient(243.27deg, #E8F552 -0.15%, #1FF6E9 47.65%, #F68AF1 101.83%)"
                bgSize="100%"
                style={{
                  "-webkit-background-clip": "text",
                  "-webkit-text-fill-color": "transparent",
                  "-moz-background-clip": "text",
                  "-moz-text-fill-color": "transparent",
                }}
              >
                Web Dev Club
              </Heading>
              <Text
                fontSize="xl"
                maxW="md"
                letterSpacing="tight"
                lineHeight="shorter"
              >
                Join our collective of student designers, developers, and
                creators today
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Box>

      <Box as="section" py={16} bg="accent.300" color="brand.600">
        <Stack
          isInline
          spacing={{ base: 0, lg: 16 }}
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
