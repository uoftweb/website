import {
  Box,
  Button,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/core";
import { features } from "configs/features";
import { siteConfig } from "configs/site";
import { useColorModeValue } from "hooks/chakra";
import { signIn, signOut, useSession } from "next-auth/client";
import NextLink from "next/link";
import { useRouter } from "next/router";

const DiscordIcon = (props) => (
  <svg viewBox="0 0 146 146" style={{ height: "1em", width: "1em" }} {...props}>
    <path
      fill="currentColor"
      d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
      fillRule="nonzero"
    />
  </svg>
);

const GithubIcon = (props) => (
  <svg viewBox="0 0 20 20" style={{ height: "1em", width: "1em" }} {...props}>
    <path
      fill="currentColor"
      d="M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0"
    />
  </svg>
);

const MenuIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1em", width: "1em" }}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1em", width: "1em" }}
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

function SiteNavigationBarLink({ href, children, isExternal }) {
  const router = useRouter();

  if (isExternal) {
    return (
      <Link
        href={href}
        isExternal={isExternal}
        _hover={{ textDecoration: "none" }}
      >
        <Button variantColor="brand" isActive={href === router.asPath}>
          {children}
        </Button>
      </Link>
    );
  }

  return (
    <NextLink href={href} passHref>
      <Button as="a" variantColor="brand" isActive={href === router.asPath}>
        {children}
      </Button>
    </NextLink>
  );
}

export function SiteNavigationBar() {
  const [session, loading] = useSession();
  const { colorMode, toggleColorMode } = useColorMode();
  const colorModeIcon = useColorModeValue("moon", "sun");
  const bg = useColorModeValue("brand.500", "brand.800");
  const mobileMenuBg = useColorModeValue("white", "gray.700");
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box as="header" id="site-header" py={1} bg={bg} color="brand.100">
      <Stack
        isInline
        spacing={3}
        align="center"
        justify="space-between"
        py={4}
        px={8}
      >
        <Stack isInline align="center" spacing={8} shouldWrapChildren>
          {/* Logo */}
          <Link
            as={NextLink}
            href={session?.user && features.dashboard ? "/dashboard" : "/"}
          >
            <a>
              <Box height={12} width={12}>
                <svg
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-labelledby="logoTitle"
                >
                  <title id="logoTitle">UofT Web Dev Club</title>
                  <rect
                    width="64"
                    height="64"
                    rx="8"
                    fill="#fff"
                    opacity={0.2}
                  />
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
          <Stack
            isInline
            shouldWrapChildren
            spacing={4}
            display={{ base: "none", lg: "flex" }}
          >
            <SiteNavigationBarLink href="/articles">
              Articles
            </SiteNavigationBarLink>
            {features.workshops && (
              <SiteNavigationBarLink href="/workshops">
                Workshops
              </SiteNavigationBarLink>
            )}
            {features.projects && (
              <SiteNavigationBarLink href="/projects">
                Projects
              </SiteNavigationBarLink>
            )}
            <SiteNavigationBarLink
              href="https://trello.com/b/p5fiez3v/public-roadmap"
              isExternal
            >
              Roadmap
            </SiteNavigationBarLink>
          </Stack>
        </Stack>

        {/* Actions */}
        <Stack isInline spacing={{ base: 0, lg: 6 }}>
          <Stack isInline>
            <Link isExternal aria-label="GitHub" href={siteConfig.github.url}>
              <IconButton
                size="md"
                fontSize="xl"
                aria-label="Open GitHub repo"
                icon={GithubIcon}
                bg="transparent"
                _hover={{ bg: "brand.300", color: "white" }}
                _active={{ bg: "brand.200", color: "white" }}
              />
            </Link>
            <Link isExternal aria-label="Discord" href={siteConfig.discord.url}>
              <IconButton
                size="md"
                fontSize="xl"
                aria-label="Open Discord server"
                icon={DiscordIcon}
                bg="transparent"
                _hover={{ bg: "brand.300", color: "white" }}
                _active={{ bg: "brand.200", color: "white" }}
              />
            </Link>
            <IconButton
              size="md"
              fontSize="xl"
              aria-label={`Switch to ${colorMode} mode`}
              bg="transparent"
              _hover={{ bg: "brand.300", color: "white" }}
              _active={{ bg: "brand.200", color: "white" }}
              onClick={toggleColorMode}
              icon={colorModeIcon}
            />
            <IconButton
              display={{ base: "inline", lg: "none" }}
              size="md"
              fontSize="2xl"
              aria-label={`Open navigation menu`}
              bg="transparent"
              _hover={{ bg: "brand.300", color: "white" }}
              _active={{ bg: "brand.200", color: "white" }}
              onClick={onOpen}
              icon={MenuIcon}
            />
          </Stack>
          {features.accounts &&
            (session ? (
              <Stack
                isInline
                spacing={6}
                align="center"
                display={{ base: "none", lg: "flex" }}
              >
                <Text>
                  Signed in as{" "}
                  <Text
                    as="span"
                    fontWeight="bold"
                    color="white"
                    whiteSpace="nowrap"
                  >
                    {/* <Link as={NextLink} href={`/user/${session?.user?.id}`}> */}
                    {session?.user?.name}
                    {/* </Link> */}
                  </Text>
                </Text>
                <Button variantColor="green" onClick={signOut}>
                  Sign out
                </Button>
              </Stack>
            ) : (
              <Stack
                isInline
                spacing={6}
                display={{ base: "none", lg: "flex" }}
              >
                <Button variantColor="brand" onClick={signIn}>
                  Sign in
                </Button>
                <Link as={NextLink} href="/membership">
                  <Button variantColor="green">Become a member</Button>
                </Link>
              </Stack>
            ))}
        </Stack>

        {/* Mobile Menu */}
        {isOpen && (
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            width="100%"
            p={5}
            display={{ base: "block", lg: "none" }}
            zIndex="popover"
          >
            <IconButton
              position="absolute"
              right={8}
              top={8}
              size="md"
              fontSize="2xl"
              aria-label={`Open navigation menu`}
              variant="ghost"
              onClick={onClose}
              icon={CloseIcon}
            />

            <Stack
              bg={mobileMenuBg}
              color="gray.500"
              borderRadius="lg"
              p={5}
              boxShadow="lg"
              spacing={6}
            >
              <Heading as="h3" size="lg">
                Navigation Menu
              </Heading>

              <Stack spacing={3} shouldWrapChildren>
                <SiteNavigationBarLink href="/articles">
                  Articles
                </SiteNavigationBarLink>
                {features.workshops && (
                  <SiteNavigationBarLink href="/workshops">
                    Workshops
                  </SiteNavigationBarLink>
                )}
                {features.projects && (
                  <SiteNavigationBarLink href="/projects">
                    Projects
                  </SiteNavigationBarLink>
                )}
                <SiteNavigationBarLink
                  href="https://trello.com/b/p5fiez3v/public-roadmap"
                  isExternal
                >
                  Roadmap
                </SiteNavigationBarLink>
              </Stack>

              {features.accounts &&
                (session ? (
                  <Stack isInline spacing={3} align="center">
                    <Text>
                      Signed in as{" "}
                      <Text as="span" fontWeight="bold" whiteSpace="nowrap">
                        <Link as={NextLink} href={`/user/${session?.user?.id}`}>
                          {session?.user?.name}
                        </Link>
                      </Text>
                    </Text>
                    <Button variantColor="green" onClick={signOut}>
                      Sign out
                    </Button>
                  </Stack>
                ) : (
                  <Stack isInline spacing={3}>
                    <Button onClick={signIn}>Sign in</Button>
                    <Link as={NextLink} href="/membership">
                      <Button variantColor="green">Become a member</Button>
                    </Link>
                  </Stack>
                ))}
            </Stack>
          </Box>
        )}
      </Stack>
    </Box>
  );
}
