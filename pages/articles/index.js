import Head from "next/head";
import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/core";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import NextLink from "next/link";
import readingTime from "reading-time";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { ArticleCard } from "../../components/ArticleCard";
import { gql, useQuery } from "@apollo/client";

const root = process.cwd();

export async function getStaticProps() {
  const contentRoot = path.join(root, "content", "articles");
  const articlesMetadata = fs.readdirSync(contentRoot).map((p) => {
    const content = fs.readFileSync(path.join(contentRoot, p), "utf8");
    const readingTimeStats = readingTime(content);
    return {
      slug: p.replace(/\.mdx/, ""),
      content,
      frontmatter: matter(content).data,
      meta: { readingTimeStats },
    };
  });
  return { props: { articlesMetadata } };
}

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      slug
      stargazers {
        id
      }
    }
  }
`;

export default function ArticleListingPage({ articlesMetadata }) {
  const { data } = useQuery(GET_ARTICLES);

  const articleDynamicData = data
    ? Object.fromEntries(data?.articles.map((a) => [a.slug, a]))
    : {};

  return (
    <>
      <Head>
        <title>Articles | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <Box as="section" py={32}>
        <Box maxW="3xl" mx="auto" px={3}>
          <Stack spacing={3}>
            <Heading>Articles</Heading>
            <Text>
              We write about topics related to web development from time to
              time. Have a read and let us know what you think
            </Text>
            <Grid templateColumns="1fr 1fr" gap={3}>
              {articlesMetadata
                .filter((a) => a.frontmatter.published)
                .map((a) => (
                  <NextLink key={a.slug} href={`/articles/${a.slug}`} passHref>
                    <Box as="a">
                      <ArticleCard
                        article={{ ...a, ...articleDynamicData[a.slug] }}
                      />
                    </Box>
                  </NextLink>
                ))}
            </Grid>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
