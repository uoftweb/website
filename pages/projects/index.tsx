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
import { getSanityContent } from "../../lib/sanityUtil";

export interface RawProjectData {
  name: string;
  excerpt: string;
  highlight: string;
  slug: { current: string };
  /* This is a date object but in string form */
  _createdAt: string;
}
export type ProjectData = Omit<RawProjectData, "slug"> & { slug: string };
export const getStaticProps = async () => {
  const projectsData = (await getSanityContent({
    query: `
      query AllProjects {
        allProject {
          name
          excerpt
          highlight
          slug {
            current
          }
          _createdAt
        }
      }
    `,
  })) as { allProject: RawProjectData[] };
  const projects = projectsData.allProject.map((p) => ({
    ...p,
    slug: p.slug.current,
  }));

  return { props: { projects } };
};

function ProjectCard({ project }: { project: ProjectData }) {
  const { name, excerpt, highlight } = project;
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
          content: '""', //eslint-disable-line
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
const ProjectsDisplay = ({ projects }: { projects: ProjectData[] }) => (
  <Box w="full" overflowX="auto" marginX="auto" py={4}>
    <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={12}>
      {projects.map((p) => (
        <Link key={p.slug} href={`/projects/${p.slug}`}>
          <a>
            <motion.div whileHover={{ y: -8 }}>
              <ProjectCard project={p} />
            </motion.div>
          </a>
        </Link>
      ))}
    </Grid>
  </Box>
);

const ProjectsSection = ({ projects }: { projects: ProjectData[] }) => {
  const bg = useColorModeValue("brand.50", "brand.800");
  const color = useColorModeValue("brand.600", "brand.50");

  const oldProjects: ProjectData[] = [];
  const recentProjects: ProjectData[] = [];
  projects.forEach((project) => {
    const projectDate = new Date(project._createdAt);
    // Number of months off to be considered a recent project
    const threshhold = 6;
    if (
      new Date() <=
      new Date(projectDate.getFullYear(), projectDate.getMonth() + threshhold)
    ) {
      recentProjects.push(project);
    } else {
      oldProjects.push(project);
    }
  });

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
        {recentProjects.length && (
          <>
            <Heading>Recent Projects</Heading>
            <ProjectsDisplay projects={recentProjects} />
          </>
        )}
        {oldProjects.length && (
          <>
            <Heading>Old Projects</Heading>
            <ProjectsDisplay projects={oldProjects} />
          </>
        )}
      </Stack>
    </Box>
  );
};

export default function ProjectsPage({
  projects,
}: {
  projects: ProjectData[];
}) {
  return (
    <>
      <NextSeo title="Projects" />
      <SiteNavigationBar />
      <ProjectsSection projects={projects} />
      <SiteFooter />
    </>
  );
}
