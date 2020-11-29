import { Badge, Box, Icon } from "@chakra-ui/core";
import { subWeeks, isWithinInterval } from "date-fns";

export function WorkshopCard({ workshop }) {
  const startDate = new Date(Date.parse(workshop.start));
  const endDate = new Date(Date.parse(workshop.end));

  const creationDate = new Date(Date.parse(workshop.start));
  const currentDate = new Date(Date.now());
  const lastWeekDate = subWeeks(currentDate, 1);

  const format = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <Box
      display="block"
      w="100%"
      h="100%"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
    >
      <Box as="img" src={workshop?.thumbnail} />
      <Box p="6" d="flex" flexDir="column">
        <Box d="flex" alignItems="baseline">
          {workshop?.youtubeId && (
            <Badge variantColor="purple" mr="2">
              Recorded
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            1 hour
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {workshop?.title}
        </Box>

        <Box flex="1">{workshop?.excerpt}</Box>

        <Box d="flex" mt="2" alignItems="center">
          <Icon name="calendar" color="teal.500" />
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {format.format(startDate)} - {format.format(endDate)}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
