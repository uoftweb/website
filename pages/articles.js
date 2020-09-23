import Head from "next/head";
import {
  Box,
  Heading,
  Button,
  Stack,
  Text,
  Stat,
  StatGroup,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from "@chakra-ui/core";
import { signIn, signOut, useSession } from "next-auth/client";

function Feature({ title, desc, ...rest }) {
  return (
    <Box p={5} shadow="md" borderWidth="1px" {...rest}>
      <Heading fontSize="xl">{title}</Heading>
      <Text mt={4}>{desc}</Text>
    </Box>
  );
}

function StackEx() {
  return (
    <Stack isInline spacing={8} align="center">
      <Feature
        title="Plan Money"
        desc="The future can be even brighter but a goal without a plan is just a wish"
      />
      <Feature
        title="Save Money"
        desc="You deserve good things. With a whooping 10-15% interest rate per annum, grow your savings on your own terms with our completely automated process"
      />
    </Stack>
  );
}

export default function Articles() {
  const [session, loading] = useSession();

  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <Box>
        <p>
          {!session && (
            <>
              Not signed in <br />
              <button onClick={signIn}>Sign in</button>
            </>
          )}
          {session && (
            <>
              Signed in as {session.user.name} <br />
              <button onClick={signOut}>Sign out</button>
            </>
          )}
        </p>
        <Heading>Articles</Heading>
        <StatGroup>
          <Stat>
            <StatLabel>Sent</StatLabel>
            <StatNumber>345,670</StatNumber>
            <StatHelpText>
              <StatArrow type="increase" />
              23.36%
            </StatHelpText>
          </Stat>

          <Stat>
            <StatLabel>Clicked</StatLabel>
            <StatNumber>45</StatNumber>
            <StatHelpText>
              <StatArrow type="decrease" />
              9.05%
            </StatHelpText>
          </Stat>
        </StatGroup>
        <Button>Click Me</Button>
        <StackEx />
      </Box>
    </>
  );
}
