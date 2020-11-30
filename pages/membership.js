import {
  Box,
  Button,
  Flex,
  Heading,
  List,
  ListItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { signIn } from "next-auth/client";
import Head from "next/head";

import { SiteNavigationBar } from "../components/SiteNavigationBar";

export default function MembershipPage() {
  return (
    <>
      <Head>
        <title>Membership | UofT Web Development Club</title>
      </Head>

      <SiteNavigationBar />

      <Box as="section" p={16}>
        <Stack spacing={3}>
          <Heading>Membership</Heading>
          <Text>
            Here are the perks of becoming a member of the web development club
          </Text>
          <List listStyleType="disc">
            <ListItem>Access to workshop recordings</ListItem>
            <ListItem>Right to vote in elections</ListItem>
          </List>
          <Flex>
            <Button variantColor="green" size="lg" onClick={signIn}>
              Sign me up
            </Button>
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
