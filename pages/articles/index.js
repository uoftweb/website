import Head from "next/head";
import {
  Badge,
  Box,
  Grid,
  Heading,
  Icon,
  Image,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import NextLink from "next/link";
import readingTime from "reading-time";
import { subWeeks, isWithinInterval } from "date-fns";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";

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

export default function ArticleListingPage({ articlesMetadata }) {
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
                .map((a) => {
                  const creationDate = new Date(
                    Date.parse(a.frontmatter.created_at)
                  );
                  const currentDate = new Date(Date.now());
                  const lastWeekDate = subWeeks(currentDate, 1);
                  const isNewArticle = isWithinInterval(creationDate, {
                    start: lastWeekDate,
                    end: currentDate,
                  });
                  return (
                    <NextLink href={`/articles/${a.slug}`} passHref>
                      <Box
                        as="a"
                        display="block"
                        key={a.slug}
                        maxW="sm"
                        borderWidth="1px"
                        rounded="lg"
                        overflow="hidden"
                      >
                        <Box p="6" d="flex" flexDir="column" height="100%">
                          <Box d="flex" alignItems="baseline">
                            {isNewArticle && (
                              <Badge variantColor="green">New</Badge>
                            )}
                            <Box
                              color="gray.500"
                              fontWeight="semibold"
                              letterSpacing="wide"
                              fontSize="xs"
                              textTransform="uppercase"
                              ml="2"
                            >
                              {a.meta.readingTimeStats.text}
                            </Box>
                          </Box>

                          <Box
                            mt="1"
                            fontWeight="semibold"
                            as="h4"
                            lineHeight="tight"
                            isTruncated
                          >
                            {a.frontmatter.title}
                          </Box>

                          <Box flex="1">{a.frontmatter.excerpt}</Box>

                          <Box d="flex" mt="2" alignItems="center">
                            <Icon name="star" color="teal.500" />
                            <Box
                              as="span"
                              ml="2"
                              color="gray.600"
                              fontSize="sm"
                            >
                              52 stars
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </NextLink>
                  );
                })}
            </Grid>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
