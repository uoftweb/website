import Head from "next/head";
import { Box, Heading, Link } from "@chakra-ui/core";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import slug from "remark-slug";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import NextLink from "next/link";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";

const Test = () => <input />;

const components = { Test };

const root = process.cwd();

export async function getStaticPaths() {
  return {
    fallback: false,
    paths: fs
      .readdirSync(path.join(root, "content", "articles"))
      .map((p) => ({ params: { slug: p.replace(/\.mdx/, "") } })),
  };
}

export async function getStaticProps({ params }) {
  const source = fs.readFileSync(
    path.join(root, "content", "articles", `${params.slug}.mdx`),
    "utf8"
  );
  const { data, content } = matter(source);
  const mdxSource = await renderToString(content, {
    components,
    scope: data,
    mdxOptions: { remarkPlugins: [slug] },
  });
  return { props: { source: mdxSource, frontmatter: data } };
}

export default function ArticlePage({ source, frontmatter }) {
  const content = hydrate(source, { components });

  return (
    <>
      <Head>
        <title>{frontmatter?.title} | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <Box as="article" p={16}>
        <Link as={NextLink} href="/articles">
          <a>Back to Articles</a>
        </Link>
        <Heading mb={4}>{frontmatter?.title}</Heading>
        <div className="wrapper">{content}</div>
      </Box>
    </>
  );
}
