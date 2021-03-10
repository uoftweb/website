import {
  Box,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import hydrate from "next-mdx-remote/hydrate";
import NextLink from "next/link";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { NextSeo } from "next-seo";
import RemarkSlugPlugin from "remark-slug";
import renderToString from "next-mdx-remote/render-to-string";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { MDXComponents } from "../../lib/articles";
import { SiteFooter } from "../../components/SiteFooter";
import { getSanityContent } from "../../lib/sanityUtil";
import GithubIcon from "../../components/GithubIcon";

export async function getStaticPaths() {
  const data = await getSanityContent({
    query: `
      query AllProjects {
        allProject {
          slug {
            current
          }
        }
      }
    `,
  });
  const paths = data.allProject.map((a) => ({
    params: { slug: a.slug.current },
  }));
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const data = await getSanityContent({
    query: `
      query ProjectBySlug($slug: String!) {
        allProject(where: { slug: { current: {eq: $slug }}}) {
          name
          excerpt
          githubUrl
          slug {
            current
          }
          body
          techStack
        }
      }
    `,
    variables: {
      slug: params.slug,
    },
  });
  const _project = data.allProject[0];
  const mdxSource = await renderToString(_project.body, {
    components: MDXComponents,
    mdxOptions: { remarkPlugins: [RemarkSlugPlugin] },
  });
  const project = {
    ..._project,
    slug: _project.slug.current,
    source: mdxSource,
  };
  return {
    props: { project },
  };
}

export default function ProjectDetailsPage({
  project: { name: title, githubUrl, excerpt, source, techStack },
}) {
  const content = hydrate(source, { components: MDXComponents });
  const headerBg = useColorModeValue("gray.50", "gray.900");
  const headerColor = useColorModeValue("gray.900", "gray.100");

  return (
    <>
      <NextSeo title={title} description={excerpt} />

      <SiteNavigationBar />

      <Box as="article" minH="100vh">
        <Box as="header" bg={headerBg} color={headerColor} py={16}>
          <Box maxW="xl" mx="auto" px={3} py={5}>
            <Stack spacing={4}>
              <Box mb={2}>
                <NextLink href="/projects#current-projects" passHref>
                  <Link>
                    <ArrowBackIcon />
                    Back
                  </Link>
                </NextLink>
              </Box>
              <Heading>{title}</Heading>
              <HStack spacing={6}>
                {githubUrl && (
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <GithubIcon color="black" boxSize={8} />
                  </a>
                )}
                {techStack && (
                  <Text as="span" fontWeight="bold">
                    {techStack?.join(" • ")}
                  </Text>
                )}
              </HStack>
            </Stack>
          </Box>
        </Box>

        <Box as="section" py={8}>
          <Box maxW="xl" mx="auto" px={3}>
            {content}
          </Box>
        </Box>
      </Box>

      <SiteFooter />
    </>
  );
}
