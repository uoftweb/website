import Head from "next/head";
import { Box, Heading, Link, Stack, Text } from "@chakra-ui/core";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import NextLink from "next/link";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";

const root = process.cwd();

export async function getStaticProps() {
  const contentRoot = path.join(root, "content", "articles");
  const articlesMetadata = fs.readdirSync(contentRoot).map((p) => {
    const content = fs.readFileSync(path.join(contentRoot, p), "utf8");
    return {
      slug: p.replace(/\.mdx/, ""),
      content,
      frontMatter: matter(content).data,
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
            <ul>
              {articlesMetadata
                .filter((a) => a.frontMatter.published)
                .map((data) => (
                  <li key={data.slug}>
                    <Text as="span" color="blue.500">
                      <Link as={NextLink} href={`/articles/${data.slug}`}>
                        {data.frontMatter.title}
                      </Link>
                    </Text>
                  </li>
                ))}
            </ul>
          </Stack>
        </Box>
      </Box>
    </>
  );
}
