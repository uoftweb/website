import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Heading,
  HStack,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import hydrate from "next-mdx-remote/hydrate";
import NextLink from "next/link";
import { subWeeks, isWithinInterval } from "date-fns";
import Confetti from "react-dom-confetti";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";
import { ArrowBackIcon, ArrowUpIcon, StarIcon } from "@chakra-ui/icons";
import { NextSeo } from "next-seo";
import readingTime from "reading-time";
import RemarkSlugPlugin from "remark-slug";
import renderToString from "next-mdx-remote/render-to-string";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { siteConfig } from "configs/site";
import { useShare } from "../../hooks/share";
import { MDXComponents } from "../../lib/articles";
import { SiteFooter } from "../../components/SiteFooter";
import { getSanityContent } from "../../lib/sanityUtil";
import GithubIcon from "../../components/GithubIcon";

// export async function getStaticPaths() {
//   const data = await getSanityContent({
//     query: `
//       query AllPublishedArticles {
//         allArticle(
//           where: { publishedAt: { gt: "0000-01-01T00:00:00.000Z" } }
//           sort: { publishedAt: ASC }
//         ) {
//           slug {
//             current
//           }
//         }
//       }
//     `,
//   });
//   const paths = data.allArticle.map((a) => ({
//     params: { slug: a.slug.current },
//   }));
//   return {
//     fallback: false,
//     paths,
//   };
// }

// export async function getStaticProps({ params }) {
//   const data = await getSanityContent({
//     query: `
//       query ArticleBySlug($slug: String!) {
//         allArticle(where: { slug: { current: {eq: $slug }}}) {
//           title
//           excerpt
//           publishedAt
//           slug {
//             current
//           }
//           author {
//             name
//           }
//           body
//         }
//       }
//     `,
//     variables: {
//       slug: params.slug,
//     },
//   });
//   const _article = data.allArticle[0];
//   const mdxSource = await renderToString(_article.body, {
//     components: MDXComponents,
//     mdxOptions: { remarkPlugins: [RemarkSlugPlugin] },
//   });
//   const article = {
//     ..._article,
//     slug: _article.slug.current,
//     author: _article.author.name,
//     source: mdxSource,
//     readingTimeStats: readingTime(_article.body),
//   };
//   return {
//     props: { article },
//   };
// }

// const GET_ARTICLE = gql`
//   query GetArticle($slug: String) {
//     article(where: { slug: $slug }) {
//       slug
//       stargazers {
//         id
//       }
//     }
//   }
// `;

export default function ProjectDetailsPage() {
  const router = useRouter();
  const { slug } = router.query;
  // const { data } = useQuery(GET_ARTICLE, { variables: { slug } });
  const [session] = useSession();
  // const content = hydrate(source, { components: MDXComponents });
  const title = "Project Name"
  const excerpt = "BLAH"
  const content = "TODO: replace me"
  const githubRepo = "#"
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
                <NextLink href="/articles" passHref>
                  <Link>
                    <ArrowBackIcon />
                    Back
                  </Link>
                </NextLink>
              </Box>
              <Heading>
                {title}
              </Heading>
              <HStack spacing={6}>
              {githubRepo && (
                <a href={githubRepo} target="_blank" rel="noopener noreferrer">
                  <GithubIcon color="black" boxSize={8} />
                </a>
              )}
              <Text as="span" fontWeight="bold">
                {["React", "Django", "Ruby on Rails"].join(" • ")}
              </Text>
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
