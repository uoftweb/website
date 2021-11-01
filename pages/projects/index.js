import {
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import { motion } from "framer-motion";
import Link from "next/link";

import { SiteFooter } from "../../components/SiteFooter";
import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { getSanityContent, urlFor } from "../../lib/sanityUtil";

export const getStaticProps = async () => {
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
};

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

const CurrentProjects = ({ projects }) => {
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
};

export default function ProjectsPage({ projects }) {
  return (
    <>
      <NextSeo title="Projects" />
      <SiteNavigationBar />
      <CurrentProjects projects={projects} />
      <SiteFooter />
    </>
  );
}
