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

      <Box as="section" p={16}>
        <Stack spacing={3}>
          <Heading>Articles</Heading>
          <Text>
            We write about topics related to web development from time to time.
            Have a read and let us know what you think
          </Text>
        </Stack>
      </Box>

      <Box as="section" p={16}>
        <ul>
          {articlesMetadata.map((data) => (
            <li key={data.slug}>
              <Link as={NextLink} href={`/articles/${data.slug}`}>
                <a>{data.frontMatter.title}</a>
              </Link>
            </li>
          ))}
        </ul>
      </Box>
    </>
  );
}