import { Avatar, Box, Heading, Stack, Text } from "@chakra-ui/core";
import { getAllUsers, getUserById } from "lib/user";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";

import { SiteNavigationBar } from "../../components/SiteNavigationBar";

export async function getStaticProps({ params }) {
  const { uid } = params;
  const user = await getUserById(parseInt(uid));

  if (!user) return { props: { user: null } };

  return {
    props: {
      user: {
        id: user.id,
        name: user.name,
        image: user.image,
      },
    },
    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const users = await getAllUsers();
  const paths = users.map((u) => ({ params: { uid: String(u.id) } }));

  return {
    paths,
    fallback: true,
  };
}

export default function Profile({ user }) {
  const [session, loading] = useSession();

  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SiteNavigationBar />
      <Box as="section" p={16}>
        <Stack isInline align="center" spacing={10}>
          <Avatar size="2xl" name={user?.name} src={user?.image} />
          <Stack spacing={3}>
            <Heading>{user?.name}</Heading>
            <Text>Description</Text>
          </Stack>
        </Stack>
      </Box>
    </>
  );
}
