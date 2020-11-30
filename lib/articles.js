import path from "path";
import fs from "fs";
import matter from "gray-matter";
import readingTime from "reading-time";
import RemarkSlugPlugin from "remark-slug";
import Highlight, { defaultProps } from "prism-react-renderer";
import dracula from "prism-react-renderer/themes/dracula";
import {
  Box,
  Heading,
  Link,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import renderToString from "next-mdx-remote/render-to-string";

export const MDXComponents = {
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
    <List
      as="ul"
      listStyleType="disc"
      listStylePosition="outside"
      px={5}
      py={3}
    >
      {props.children}
    </List>
  ),
  ol: (props) => (
    <List
      as="ol"
      listStyleType="decimal"
      listStylePosition="outside"
      px={5}
      py={3}
    >
      {props.children}
    </List>
  ),
  li: (props) => (
    <ListItem as="li" py={2} ml={3}>
      {props.children}
    </ListItem>
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
const articlesRoot = path.join(root, "content", "articles");
const pathRegex = /^((\d{4})\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01]))\-(.*)\.mdx$/;

export async function getArticlePaths() {
  const paths = await fs.promises.readdir(articlesRoot);
  const validPaths = paths
    .filter((p) => p.match(pathRegex))
    .map((p) => {
      const [_, date, year, month, day, slug] = p.match(pathRegex);
      return {
        path: p,
        slug,
      };
    });
  return validPaths;
}

export async function getArticles() {
  const paths = await fs.promises.readdir(articlesRoot);
  const validPaths = paths.filter((p) => p.match(pathRegex));

  const articles = await Promise.all(
    validPaths.map(async (p) => {
      const [_, date, year, month, day, slug] = p.match(pathRegex);
      const source = await fs.promises.readFile(
        path.join(articlesRoot, p),
        "utf8"
      );
      const { data, content } = matter(source);
      const mdxSource = await renderToString(content, {
        components: MDXComponents,
        scope: data,
        mdxOptions: { remarkPlugins: [RemarkSlugPlugin] },
      });
      const readingTimeStats = readingTime(content);

      return {
        slug,
        date,
        frontmatter: data,
        rawContent: content,
        source: mdxSource,
        meta: { readingTimeStats },
      };
    })
  );

  return articles;
}
