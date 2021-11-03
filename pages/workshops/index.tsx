import {
  Box, Grid, Heading, Stack, Text,
} from "@chakra-ui/react";
import { NextSeo } from "next-seo";
import NextLink from "next/link";

import { Container } from "../../components/Container";
import { PageHeader } from "../../components/PageHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { SiteNavigationBar } from "../../components/SiteNavigationBar";
import { WorkshopCard } from "../../components/WorkshopCard";
import { getSanityContent } from "../../lib/sanityUtil";

export async function getStaticProps() {
  const data = await getSanityContent({
    query: `
      query AllWorkshops {
        allWorkshop(sort: { start: DESC }) {
          title
          slug {
            current
          }
          excerpt
          start
          end
          mainImage {
            asset {
              url
            }
          }
          youtubeVideo {
            url
          }
        }
      }
    `,
  });
  const workshops = data.allWorkshop.map((w) => ({
    ...w,
    slug: w.slug.current,
    thumbnail: w.mainImage.asset.url,
    youtubeVideoUrl: w.youtubeVideo.url,
  }));
  return { props: { workshops } };
}

export default function WorkshopsPage({ workshops }) {
  return (
    <>
      <NextSeo title="Workshops" />

      <SiteNavigationBar />

      <PageHeader title="Workshops" />

      <Box as="section" py={16}>
        <Container>
          <Stack spacing={8}>
            <Text fontSize="xl">
              Build and learn how to use the latest web technology with our
              amazing workshop instructors.
            </Text>
            <Box>
              <Heading as="h2" fontSize="lg" mb={4} />
              <Grid
                templateColumns="repeat(auto-fit, minmax(300px, 1fr))"
                gap={3}
              >
                {workshops.map((w) => (
                  <NextLink key={w.slug} href={`/workshops/${w.slug}`} passHref>
                    <Box as="a" maxW="md">
                      <WorkshopCard workshop={w} />
                    </Box>
                  </NextLink>
                ))}
              </Grid>
            </Box>
          </Stack>
        </Container>
      </Box>

      <SiteFooter />
    </>
  );
}
