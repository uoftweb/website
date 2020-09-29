import Head from "next/head";
import { Box, Heading, Link, Stack, Text } from "@chakra-ui/core";
import renderToString from "next-mdx-remote/render-to-string";
import hydrate from "next-mdx-remote/hydrate";
import slug from "remark-slug";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import NextLink from "next/link";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";
import readingTime from "reading-time";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { useColorModeValue } from "hooks/chakra";

const MDXComponents = {
  h1: (props) => (
    <Heading as="h2" size="lg" mb={3} mt={8}>
      {props.children}
    </Heading>
  ),
  h2: (props) => (
    <Heading as="h3" size="md" mb={3} mt={8}>
      {props.children}
    </Heading>
  ),
  p: (props) => (
    <Text as="p" lineHeight="tall" mb={3}>
      {props.children}
    </Text>
  ),
  strong: (props) => <Box as="strong" fontWeight="semibold" {...props} />,
  a: (props) => (
    <Link isExternal href={props.href} color="blue.500">
      {props.children}
    </Link>
  ),
  ul: (props) => (
    <Box as="ul" my={5}>
      {props.children}
    </Box>
  ),
  ol: (props) => (
    <Box as="ol" my={5}>
      {props.children}
    </Box>
  ),
  li: (props) => (
    <Text as="li" pb={2}>
      {props.children}
    </Text>
  ),
  inlineCode: (props) => (
    <Box
      as="code"
      color={useColorModeValue("purple.500", "purple.200")}
      bg={useColorModeValue("purple.50", "purple.900")}
      borderRadius="md"
      p={1}
      {...props}
    />
  ),
  pre: (props) => <div {...props} />,
  code: ({ children, className }) => {
    const code = children.trim();
    const language = className?.replace(/language-/, "");
    const theme = dracula;
    return (
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <Box
            as="pre"
            className={className}
            style={{ ...style }}
            p={3}
            borderRadius="md"
            overflowX="auto"
            my={5}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Box>
        )}
      </Highlight>
    );
  },
};

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
    components: MDXComponents,
    scope: data,
    mdxOptions: { remarkPlugins: [slug] },
  });
  const readingTimeStats = readingTime(content);
  return {
    props: { source: mdxSource, frontmatter: data, meta: { readingTimeStats } },
  };
}

export default function ArticlePage({ source, frontmatter, meta }) {
  const content = hydrate(source, {
    components: MDXComponents,
  });

  return (
    <>
      <Head>
        <title>{frontmatter?.title} | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <Box as="article" py={32}>
        <Box maxW="xl" mx="auto" px={3}>
          <Stack spacing={4}>
            <Text as="span" color="blue.500">
              <Link as={NextLink} href="/articles">
                Back to Articles
              </Link>
            </Text>
            <Heading>{frontmatter?.title}</Heading>
            <Text>
              Written by{" "}
              <Text as="span" fontWeight="bold">
                {frontmatter.author}
              </Text>{" "}
              on {new Date(Date.parse(frontmatter.created_at)).toDateString()}{" "}
              &middot; {meta.readingTimeStats.text}
            </Text>
          </Stack>
          <Box py={5}>{content}</Box>
        </Box>
      </Box>
    </>
  );
}
