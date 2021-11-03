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
        {({
          className, style, tokens, getLineProps, getTokenProps,
        }) => (
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
