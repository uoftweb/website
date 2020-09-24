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
      <Link as={NextLink} href="/">
        <a>
          <Box height={12} width={12}>
            <svg
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-labelledby="logoTitle"
            >
              <title id="logoTitle">UofT Web Dev Club</title>
              <rect width="64" height="64" rx="8" fill="#216BFF" />
              <g clipPath="url(#clip0)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M51.636 46.419c-3.704-1.844-11.198-4.95-19.636-4.95-8.43 0-15.924 3.103-19.636 4.95V23.824h-2.182v23.766c-.188.11-.285.17-.285.17C8.849 48.345 8 47.836 8 46.627V17.193a2.21 2.21 0 01.643-1.553c.41-.411.966-.641 1.544-.64h43.626a2.174 2.174 0 011.543.64c.41.411.642.97.644 1.553v29.434c0 1.212-.844 1.705-1.911 1.124 0 0-.093-.057-.27-.162V23.822h-2.183v22.597zm-41.454-28.48c0-.405.326-.733.72-.733h42.196c.398 0 .72.328.72.733v5.884H10.183v-5.884zm9.09 3.678c.603 0 1.092-.494 1.092-1.103s-.49-1.103-1.091-1.103c-.602 0-1.091.495-1.091 1.104 0 .608.489 1.103 1.09 1.103v-.001zm-2.908 0c.602 0 1.09-.494 1.09-1.103s-.488-1.103-1.09-1.103c-.603 0-1.091.495-1.091 1.104 0 .608.489 1.103 1.09 1.103v-.001zm-2.91 0c.603 0 1.091-.494 1.091-1.103s-.488-1.103-1.09-1.103c-.603 0-1.091.495-1.091 1.104 0 .608.488 1.103 1.09 1.103v-.001z"
                  fill="#fff"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <path
                    fill="#fff"
                    transform="translate(8 15)"
                    d="M0 0h48v33H0z"
                  />
                </clipPath>
              </defs>
            </svg>
          </Box>
        </a>
      </Link>

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
