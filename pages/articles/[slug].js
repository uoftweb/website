import Head from "next/head";
import {
  Badge,
  Box,
  Button,
  ButtonGroup,
  Heading,
  Link,
  Stack,
  Text,
} from "@chakra-ui/core";
import hydrate from "next-mdx-remote/hydrate";
import NextLink from "next/link";
import { subWeeks, isWithinInterval } from "date-fns";
import Confetti from "react-dom-confetti";
import { signIn, useSession } from "next-auth/client";
import { useRouter } from "next/router";
import { gql, useMutation, useQuery } from "@apollo/client";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { useColorModeValue } from "hooks/chakra";
import { siteConfig } from "configs/site";
import { useShare } from "../../hooks/share";
import {
  getArticlePaths,
  getArticles,
  MDXComponents,
} from "../../lib/getArticles";

const DiscordIcon = (props) => (
  <svg viewBox="0 0 146 146" style={{ height: "1em", width: "1em" }} {...props}>
    <path
      fill="currentColor"
      d="M107.75 125.001s-4.5-5.375-8.25-10.125c16.375-4.625 22.625-14.875 22.625-14.875-5.125 3.375-10 5.75-14.375 7.375-6.25 2.625-12.25 4.375-18.125 5.375-12 2.25-23 1.625-32.375-.125-7.125-1.375-13.25-3.375-18.375-5.375-2.875-1.125-6-2.5-9.125-4.25-.375-.25-.75-.375-1.125-.625-.25-.125-.375-.25-.5-.375-2.25-1.25-3.5-2.125-3.5-2.125s6 10 21.875 14.75c-3.75 4.75-8.375 10.375-8.375 10.375-27.625-.875-38.125-19-38.125-19 0-40.25 18-72.875 18-72.875 18-13.5 35.125-13.125 35.125-13.125l1.25 1.5c-22.5 6.5-32.875 16.375-32.875 16.375s2.75-1.5 7.375-3.625c13.375-5.875 24-7.5 28.375-7.875.75-.125 1.375-.25 2.125-.25 7.625-1 16.25-1.25 25.25-.25 11.875 1.375 24.625 4.875 37.625 12 0 0-9.875-9.375-31.125-15.875l1.75-2S110 19.626 128 33.126c0 0 18 32.625 18 72.875 0 0-10.625 18.125-38.25 19zM49.625 66.626c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875.125-7.625-5.625-13.875-12.75-13.875zm45.625 0c-7.125 0-12.75 6.25-12.75 13.875s5.75 13.875 12.75 13.875c7.125 0 12.75-6.25 12.75-13.875s-5.625-13.875-12.75-13.875z"
      fillRule="nonzero"
    />
  </svg>
);

const confettiConfig = {
  angle: 90,
  spread: "145",
  startVelocity: "24",
  elementCount: "17",
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

export async function getStaticPaths() {
  const articlePaths = await getArticlePaths();
  const paths = articlePaths.map((p) => ({ params: { slug: p.slug } }));
  return {
    fallback: false,
    paths,
  };
}

export async function getStaticProps({ params }) {
  const articles = await getArticles();
  const article = articles.find((a) => a.slug === params.slug);
  return {
    props: article,
  };
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

const GET_ARTICLE = gql`
  query GetArticle($slug: String) {
    article(where: { slug: $slug }) {
      slug
      stargazers {
        id
      }
    }
  }
`;

const STAR_ARTICLE = gql`
  mutation StarArticle($slug: String!) {
    starArticle(slug: $slug) {
      slug
      stargazers {
        id
      }
    }
  }
`;

const UNSTAR_ARTICLE = gql`
  mutation UnstarArticle($slug: String!) {
    unstarArticle(slug: $slug) {
      slug
      stargazers {
        id
      }
    }
  }
`;

export default function ArticlePage({ date, source, frontmatter, meta }) {
  const router = useRouter();
  const { slug } = router.query;
  const { data } = useQuery(GET_ARTICLE, { variables: { slug } });
  const [starArticle] = useMutation(STAR_ARTICLE, { variables: { slug } });
  const [unstarArticle] = useMutation(UNSTAR_ARTICLE, { variables: { slug } });
  const [session] = useSession();
  const content = hydrate(source, { components: MDXComponents });
  const starred = Boolean(
    data?.article?.stargazers.find((u) => u.id === session?.user.id)
  );
  const creationDate = new Date(Date.parse(date));
  const currentDate = new Date(Date.now());
  const lastWeekDate = subWeeks(currentDate, 1);
  const isNewArticle = isWithinInterval(creationDate, {
    start: lastWeekDate,
    end: currentDate,
  });
  const headerBg = useColorModeValue("gray.50", "gray.900");
  const headerColor = useColorModeValue("gray.900", "gray.100");
  const { share, ShareModal } = useShare({
    title: frontmatter?.title,
    url:
      typeof window !== "undefined"
        ? window.location.href
        : "https://uoftweb.com",
    text: `${frontmatter?.title} - ${frontmatter?.excerpt}\nRead more at: `,
  });

  return (
    <>
      <Head>
        <title>{frontmatter?.title} | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <Box as="article">
        <Box as="header" bg={headerBg} color={headerColor} py={16}>
          <Box maxW="xl" mx="auto" px={3} py={5}>
            <Stack spacing={4}>
              <Text as="span" color="blue.500">
                <Link as={NextLink} href="/articles">
                  Back to Articles
                </Link>
              </Text>
              <Heading>
                {frontmatter?.title}{" "}
                {isNewArticle && (
                  <Badge ml="1" variantColor="green">
                    New
                  </Badge>
                )}
              </Heading>
              <Text>
                Written by{" "}
                <Text as="span" fontWeight="bold">
                  {frontmatter.author}
                </Text>{" "}
                on {creationDate.toDateString()} &bull;{" "}
                {meta.readingTimeStats.text} &bull;{" "}
                {data?.article?.stargazers.length ?? "0"} stars
              </Text>
              <ButtonGroup spacing={4} size="sm">
                {session ? (
                  <Button
                    leftIcon="star"
                    variantColor="purple"
                    variant={starred ? "solid" : "outline"}
                    onClick={() => (starred ? unstarArticle() : starArticle())}
                  >
                    <Confetti active={starred} config={confettiConfig} />
                    {starred ? "Unstar" : "Star"}
                  </Button>
                ) : (
                  <Button
                    leftIcon="star"
                    variantColor="purple"
                    variant="outline"
                    onClick={() => signIn()}
                  >
                    Sign in to Star
                  </Button>
                )}

                <Button variantColor="blue" variant="ghost" onClick={share}>
                  Share
                </Button>
                <ShareModal />
              </ButtonGroup>
            </Stack>
          </Box>
        </Box>

        <Box as="section" py={8}>
          <Box maxW="xl" mx="auto" px={3}>
            {content}
          </Box>
        </Box>

        <Box as="footer" py={8}>
          <Box maxW="xl" mx="auto" px={3}>
            <ButtonGroup>
              <Button
                as="a"
                href={siteConfig.discord.url}
                leftIcon={DiscordIcon}
                variantColor="purple"
                variant="solid"
              >
                Discuss this article on Discord
              </Button>
              <Button leftIcon="arrow-up" variant="solid" onClick={scrollToTop}>
                Back to Top
              </Button>
            </ButtonGroup>
          </Box>
        </Box>
      </Box>
    </>
  );
}
