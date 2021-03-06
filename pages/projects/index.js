import {
  Badge,
  Box,
  Button,
  Center,
  Heading,
  Stack,
  HStack,
  Text,
  useColorModeValue,
  List,
  ListIcon,
  ListItem,
  Icon,
  Grid,
  Divider,
  VStack,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import NextLink from "next/link";
import { motion, useMotionValue, useTransform } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

import { Container } from "../../components/Container";
import { SiteFooter } from "../../components/SiteFooter";
import { BlueBall, GlowingTealBall } from "../../components/Ball";
import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { ProjectsTimeline } from "../../components/ProjectsTimeline";
import { features } from "../../configs/features";
import { getSanityContent, urlFor } from "../../lib/sanityUtil";

const CircleIcon = (props) => (
  <Icon viewBox="0 0 72 72" {...props}>
    <linearGradient x1="0" y1="0" x2="100%" y2="100%" id="gradient">
      <stop stopColor="#6BE99D" offset="0" />
      <stop stopColor="#2AB1EB" offset="100%" />
    </linearGradient>
    <circle fill="url(#gradient)" cx="36" cy="36" r="20" />
  </Icon>
);

function ProjectPageHeader() {
  const bg = useColorModeValue("brand.600", "brand.900");
  return (
    <Box
      as="header"
      pt={28}
      pb={24}
      bg={bg}
      backgroundImage="linear-gradient(0deg, #041050, #041050)"
      boxShadow="sm"
      overflow="hidden"
      position="relative"
      zIndex="0"
    >
      <Container
        as={Stack}
        spacing={16}
        direction={{ base: "column-reverse", lg: "row" }}
      >
        <Stack
          spacing="32px"
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
          maxW={{ base: "full", lg: "md" }}
        >
          <Stack spacing="16px" align={{ base: "center", lg: "flex-start" }}>
            <Badge variant="solid" colorScheme="yellow">
              Applications Closed
            </Badge>

            <Heading
              as="h1"
              fontSize="4xl"
              fontWeight="semibold"
              letterSpacing="tight"
              color="white"
            >
              Bring your idea to life
            </Heading>

            <Text color="brand.200">
              Over the course of the <strong>winter semester</strong>, we’ll
              help you turn your project from an idea into a polished product
              that you can share with the world!
            </Text>
          </Stack>

          <Stack spacing="16px" align={{ base: "center", lg: "flex-start" }}>
            <Button
              as="a"
              variant="solid"
              color="brand.600"
              width={{ base: "full", lg: "unset" }}
              href="/projects/apply"
              target="_blank"
              rel="noopener noreferrer"
              isDisabled
            >
              Apply Now
            </Button>

            <Text color="brand.300" fontSize="xs">
              Applications close <strong>January 30th</strong> and will be
              considered on a rolling basis
            </Text>
          </Stack>
        </Stack>

        <Center flex="1" position="relative">
          <Box
            position="absolute"
            left="0"
            top="0"
            width="100%"
            height="100%"
            backgroundImage="radial-gradient(50% 50.2% at 50% 50%, #216BFF 0%, rgba(33, 107, 255, 0) 100%)"
          ></Box>
          <BlueBall size={60} position="relative">
            <Box
              as="img"
              src="/images/lightbulb.svg"
              position="absolute"
              left="calc((100% - 150px) / 2)"
              top="calc((100% - 150px) / 2)"
              width="150px"
              height="150px"
            ></Box>
            <BlueBall size={3} position="absolute" top="148px" left="-270px" />
            <GlowingTealBall
              size={5}
              position="absolute"
              top="80px"
              left="-183px"
            />
            <BlueBall size={6} position="absolute" top="106px" left="-105px" />
            <BlueBall size={16} position="absolute" top="168px" left="-112px" />
            <BlueBall size={8} position="absolute" top="52px" left="-50px" />

            <BlueBall size={6} position="absolute" top="180px" right="-50px" />
            <BlueBall size={6} position="absolute" top="140px" right="-120px" />
            <GlowingTealBall
              size={16}
              position="absolute"
              top="30px"
              right="-120px"
            />
            <GlowingTealBall
              size={4}
              position="absolute"
              top="180px"
              right="-170px"
            />
            <BlueBall size={10} position="absolute" top="85px" right="-220px" />
          </BlueBall>
        </Center>
      </Container>
    </Box>
  );
}

function MentorCard({ index, src, name, skills, onDismiss }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const squaredDistance = useTransform(
    [x, y],
    ([latestX, latestY]) => latestX * latestX + latestY * latestY
  );
  const opacity = useTransform(squaredDistance, [0, 20000], [1, 0.2]);

  return (
    <Box
      as={motion.div}
      drag
      dragMomentum
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      onDragEnd={(_, info) => {
        const { x, y } = info.point;
        const squaredDistance = x * x + y * y;
        if (squaredDistance > 10000) {
          onDismiss(index);
        }
      }}
      variants={{
        initial: { opacity: 0, y: -100 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            type: "keyframes",
            ease: "easeInOut",
          },
        },
      }}
      style={{
        rotate: `${index % 2 === 0 ? "-" : ""}${3 * index}deg`,
        scale: 1,
        x,
        y,
        opacity,
      }}
      whileHover={{ rotate: "0deg" }}
      whileDrag={{ rotate: "0deg" }}
      whileTap={{ scale: 0.97 }}
      position="absolute"
      top={0}
      left={0}
      zIndex={index + 1}
    >
      <Stack
        bg="white"
        color="brand.600"
        borderRadius="2xl"
        boxShadow="lg"
        fontSize="xl"
        letterSpacing="tight"
        w="100%"
        h="100%"
        overflow="hidden"
        minW="sm"
      >
        {src ? (
          <Box as="img" src={src} userSelect="none" pointerEvents="none" />
        ) : (
          <Box bg="gray.300" h="xs" />
        )}
        <Stack p={8} spacing={6}>
          <Heading
            as="h3"
            fontWeight="semibold"
            fontSize="3xl"
            lineHeight="none"
          >
            {name}
          </Heading>
          <List as="ul" pl={6} spacing={2}>
            {skills.map((skill) => (
              <ListItem key={skill}>
                <ListIcon as={CircleIcon} boxSize={4} mb={1} />
                {skill}
              </ListItem>
            ))}
          </List>
        </Stack>
      </Stack>
    </Box>
  );
}

function LastCard() {
  return (
    <Center
      position={"relative"}
      top={0}
      left={0}
      color="brand.600"
      borderRadius="2xl"
      borderWidth={4}
      borderStyle="dashed"
      borderColor="brand.100"
      fontSize="xl"
      letterSpacing="tight"
      w="100%"
      h="100%"
      overflow="hidden"
      minW="sm"
      minH="xl"
    >
      <VStack>
        <Heading size="md">That&apos;s all folks!</Heading>
        <Text>Click Reset to go through them again</Text>
      </VStack>
    </Center>
  );
}

function MentorCardList({ mentors, onDismiss }) {
  return (
    <Box position="relative" w="100%">
      {mentors.map(({ thumbnailUrl, name, skills }, i) => (
        <MentorCard
          key={name}
          index={i}
          src={thumbnailUrl}
          name={name}
          skills={skills}
          onDismiss={onDismiss}
        />
      ))}
      <LastCard />
    </Box>
  );
}

const textVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export async function getStaticProps() {
  const projectsData = await getSanityContent({
    query: `
      query AllProjects {
        allProject {
          name
          excerpt
          highlight
          slug {
            current
          }
        }
      }
    `,
  });
  const projects = projectsData.allProject.map((p) => ({
    ...p,
    slug: p.slug.current,
  }));

  const mentorsData = await getSanityContent({
    query: `
      query MentorSkills {
        allMentor {
          name
          skills
          image {
            asset {
              _id
              url
            }
            crop {
              top
              left
              bottom
              right
            }
            hotspot {
              x
              y
              height
              width
            }
          }
        }
      }
    `,
  });
  const mentors = mentorsData.allMentor.map((m) => ({
    ...m,
    thumbnailUrl: urlFor(m.image).url(),
  }));
  return { props: { mentors, projects } };
}

function MentorSection({ mentors: allMentors }) {
  const [mentors, setMentors] = useState(allMentors);
  const bg = useColorModeValue("brand.50", "brand.600");
  const color = useColorModeValue("brand.600", "brand.50");

  function handleDismiss(index) {
    const newMentors = mentors.filter((_, i) => i !== index);
    setMentors(newMentors);
  }

  return (
    <Box as="section" id="mentors" py={16} bg={bg} color={color}>
      <Stack
        as={motion.div}
        variants={{
          initial: {},
          animate: {
            transition: {
              when: "afterChildren",
              staggerChildren: 0.3,
            },
          },
        }}
        initial="initial"
        animate="animate"
        direction="row"
        spacing={{ base: 0, lg: 16, xl: 32 }}
        maxW="80rem"
        mx="auto"
        px={3}
        align="center"
        justify={{ base: "center", lg: "flex-start" }}
      >
        <Box w="md" p={8} display={{ base: "none", lg: "block" }}>
          {mentors && (
            <MentorCardList mentors={mentors} onDismiss={handleDismiss} />
          )}
        </Box>

        <Stack
          as={motion.div}
          variants={textVariants}
          spacing={6}
          maxW="2xl"
          align={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
        >
          <Stack spacing={3}>
            <Heading>Get one-on-one help from our team</Heading>
            <Text fontSize="lg">
              With help from our amazingly talented <strong>staff</strong> and{" "}
              <strong>network of mentors</strong>, we’ll help you jump through
              the various hoops of product development.
            </Text>
          </Stack>
          <Stack isInline>
            {mentors.length > 0 && (
              <Button
                variant="ghost"
                colorScheme="brand"
                onClick={() => handleDismiss(mentors.length - 1)}
              >
                Next
              </Button>
            )}
            {mentors.length !== allMentors.length && (
              <Button
                variant="ghost"
                colorScheme="brand"
                onClick={() => setMentors(allMentors)}
              >
                Reset
              </Button>
            )}
            {features.mentors && (
              <NextLink href="/workshops" passHref>
                <Button as="a" size="lg" variant="link" colorScheme="brand">
                  Meet the Team
                </Button>
              </NextLink>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}

function TimelineSection() {
  const bg = useColorModeValue("white", "brand.800");
  const color = useColorModeValue("brand.600", "brand.50");

  return (
    <Box as="section" py={{ base: 16, lg: 32 }} bg={bg} color={color}>
      <Stack
        spacing={{ base: 8, lg: 16 }}
        maxW="80rem"
        mx="auto"
        px={3}
        align="center"
        justify={{ base: "center", lg: "flex-start" }}
      >
        <Heading textAlign="center">From idea to MVP in three months</Heading>

        <Box w="full" overflowX="auto" marginX="auto" p={8}>
          <ProjectsTimeline />
        </Box>
      </Stack>
    </Box>
  );
}

function ProjectCard({ name, excerpt, highlight }) {
  return (
    <Stack
      bg="white"
      borderRadius="2xl"
      boxShadow="lg"
      letterSpacing="tight"
      p={8}
      spacing={6}
      maxW="md"
    >
      <Heading
        as="h3"
        color="brand.800"
        fontWeight="semibold"
        fontSize="3xl"
        lineHeight="none"
      >
        {name}
      </Heading>
      <Text
        color="gray.700"
        as="p"
        flex="1"
        fontSize="md"
        fontWeight="medium"
        minH={12}
        maxH={24}
        overflow="hidden"
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          display: "block",
          bottom: 0,
          left: 0,
          width: "full",
          height: 12,
          bgGradient: "linear(to-b, whiteAlpha.50, whiteAlpha.900)",
        }}
      >
        {excerpt}
      </Text>
      <Text color="brand.500" fontWeight="semibold">
        {highlight}
      </Text>
    </Stack>
  );
}

function CurrentProjects({ projects }) {
  const bg = useColorModeValue("brand.50", "brand.800");
  const color = useColorModeValue("brand.600", "brand.50");

  return (
    <Box
      as="section"
      id="current-projects"
      py={{ base: 16, lg: 32 }}
      bg={bg}
      color={color}
    >
      <Stack
        spacing={{ base: 8, lg: 16 }}
        maxW="80rem"
        mx="auto"
        px={3}
        justify={{ base: "center", lg: "flex-start" }}
      >
        <Heading>Current Projects</Heading>

        <Box w="full" overflowX="auto" marginX="auto" py={4}>
          <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={12}>
            {projects.map((p) => (
              <Link key={p.slug} href={`/projects/${p.slug}`}>
                <a>
                  <motion.div whileHover={{ y: -8 }}>
                    <ProjectCard
                      name={p.name}
                      excerpt={p.excerpt}
                      highlight={p.highlight}
                    />
                  </motion.div>
                </a>
              </Link>
            ))}
          </Grid>
        </Box>
      </Stack>
    </Box>
  );
}

export default function ProjectsPage({ mentors, projects }) {
  return (
    <>
      <NextSeo title="Projects" />

      <SiteNavigationBar />

      <ProjectPageHeader />

      <MentorSection mentors={mentors} />

      <TimelineSection />

      <CurrentProjects projects={projects} />

      <SiteFooter />
    </>
  );
}
