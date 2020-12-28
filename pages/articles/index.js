import { Box, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { gql, useQuery } from "@apollo/client";
import { NextSeo } from "next-seo";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { ArticleCard } from "../../components/ArticleCard";
import { LargePageHeader } from "../../components/PageHeader";
import { Container } from "../../components/Container";
import { SiteFooter } from "../../components/SiteFooter";
import { getSanityContent } from "../../lib/getSanityContent";

export async function getStaticProps() {
  const data = await getSanityContent({
    query: `
      query AllPublishedArticles {
        allArticle(
          where: { publishedAt: { gt: "0000-01-01T00:00:00.000Z" } }
          sort: { publishedAt: ASC }
        ) {
          title
          slug {
            current
          }
          excerpt
          publishedAt
        }
      }    
    `,
  });
  const articles = data.allArticle.map((a) => ({ ...a, slug: a.slug.current }));
  return { props: { articles } };
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

export default function ArticleListingPage({ articles }) {
  const { data } = useQuery(GET_ARTICLES);

  const articleDynamicData = data
    ? Object.fromEntries(data?.articles.map((a) => [a.slug, a]))
    : {};

  return (
    <>
      <NextSeo title="Articles" />

      <SiteNavigationBar />

      <LargePageHeader title="Articles" />

      <Box as="section" py={16} minH="80vh">
        <Container>
          <Stack spacing={8}>
            <Text fontSize="xl">
              We write about topics related to web development from time to
              time. Have a read and let us know what you think
            </Text>
            <Box>
              <Heading as="h2" fontSize="lg" mb={4}>
                All Articles
              </Heading>
              <Grid
                templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                gap={3}
                mt={5}
              >
                {articles.map((a) => (
                  <NextLink key={a.slug} href={`/articles/${a.slug}`} passHref>
                    <Box as="a">
                      <ArticleCard
                        article={{ ...a, ...articleDynamicData[a.slug] }}
                      />
                    </Box>
                  </NextLink>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>

      <SiteFooter />
    </>
  );
}
