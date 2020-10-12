import { Avatar, Box, Grid, Heading, Stack, Text } from "@chakra-ui/core";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import NextLink from "next/link";
import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { gql, useQuery } from "@apollo/client";
import { ArticleCard } from "../../components/ArticleCard";
import { PageHeader } from "../../components/PageHeader";
import { Container } from "../../components/Container";
import { getArticles } from "../../lib/articles";

const root = process.cwd();

export async function getServerSideProps() {
  const articles = await getArticles();
  return { props: { articles } };
}

const GET_USER_DETAILS = gql`
  query GetUserDetails($id: Int!) {
    user(where: { id: $id }) {
      id
      name
      image
      starredArticles {
        slug
        stargazers {
          id
        }
      }
    }
  }
`;

export default function ProfilePage({ user, articles }) {
  const [session, loading] = useSession();
  const router = useRouter();
  const { uid } = router.query;
  const { data } = useQuery(GET_USER_DETAILS, {
    variables: { id: parseInt(uid) },
  });

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SiteNavigationBar />

      <PageHeader title="User Profile" />

      <Box as="section" py={16}>
        <Container>
          <Stack isInline align="center" spacing={10}>
            <Avatar
              size="2xl"
              name={data?.user?.name}
              src={data?.user?.image}
            />
            <Stack spacing={3}>
              <Heading>{data?.user?.name}</Heading>
              <Text>Description</Text>
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Box as="section" py={16}>
        <Container>
          <Heading as="h2" size="lg" mb={5}>
            Starred Articles
          </Heading>
          <Grid templateColumns="1fr 1fr" gap={3}>
            {data?.user.starredArticles.map((a) => {
              const article = articles?.find(
                (article) => article.slug === a.slug
              );
              return (
                <NextLink key={a.slug} href={`/articles/${a.slug}`} passHref>
                  <Box as="a">
                    <ArticleCard article={{ ...article, ...a }} />
                  </Box>
                </NextLink>
              );
            })}
          </Grid>
        </Container>
      </Box>
    </>
  );
}
