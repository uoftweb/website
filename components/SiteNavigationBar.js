import {
  Badge,
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import { signIn, signOut, useSession } from "next-auth/client";
import NextLink from "next/link";

export function SiteNavigationBar() {
  const [session, loading] = useSession();

  return (
    <Flex
      align="center"
      justify="space-between"
      p={4}
      bg="WHITE"
      boxShadow="md"
    >
      {/* Logo */}
      <Text fontWeight="bold" whiteSpace="nowrap">
        <Link as={NextLink} href="/">
          UofT Web Dev Club
        </Link>
      </Text>

      {/* Navigation Menu */}
      <Stack isInline shouldWrapChildren spacing={6}>
        <Link as={NextLink} href="/articles">
          Articles
        </Link>
        <Link as={NextLink} href="/workshops">
          Workshops
        </Link>
        <Box>
          {/* <Link as={NextLink} href="/projects"> */}
          Projects
          {/* </Link> */}
          <Badge ml={2} variant="subtle" variantColor="purple">
            Coming soon
          </Badge>
        </Box>
        <Link href="https://trello.com/b/p5fiez3v/public-roadmap" isExternal>
          Roadmap <Icon name="external-link" mx="2px" />
        </Link>
        <Link href="https://discord.com/invite/J4ZhUxg" isExternal>
          Discord <Icon name="external-link" mx="2px" />
        </Link>
      </Stack>

      {/* Actions */}
      <Box>
        {!session && (
          <Stack isInline spacing={6}>
            <Button variant="link" onClick={signIn}>
              Sign in
            </Button>
            <Button variantColor="green">Sign up</Button>
          </Stack>
        )}
        {session && (
          <Stack isInline spacing={6} align="center">
            <Text>
              Signed in as{" "}
              <Text as="span" fontWeight="bold">
                <Link as={NextLink} href={`/user/${session?.user?.id}`}>
                  {session?.user?.name}
                </Link>
              </Text>
            </Text>
            <Button onClick={signOut}>Sign out</Button>
          </Stack>
        )}
      </Box>
    </Flex>
  );
}
