import { Avatar, Box, Grid, Heading, Stack, Text } from "@chakra-ui/core";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { gql, useQuery } from "@apollo/client";
import { ArticleCard } from "../../components/ArticleCard";

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

export default function ProfilePage({ user }) {
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

      <Box as="section" py={32}>
        <Box maxW="3xl" mx="auto" px={3}>
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
        </Box>
      </Box>

      <Box as="section" py={8}>
        <Box maxW="3xl" mx="auto" px={3}>
          <Stack spacing={3}>
            <Heading as="h2">Starred Articles</Heading>
            <Grid templateColumns="1fr 1fr" gap={3}>
              {data?.user.starredArticles.map((a) => (
                <NextLink key={a.slug} href={`/articles/${a.slug}`} passHref>
                  <Box as="a">
                    <ArticleCard article={a} />
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
