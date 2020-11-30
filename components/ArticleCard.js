import { StarIcon } from "@chakra-ui/icons";
import { Badge, Box, Icon } from "@chakra-ui/react";
import { subWeeks, isWithinInterval } from "date-fns";

export function ArticleCard({ article }) {
  const creationDate = new Date(Date.parse(article.date));
  const currentDate = new Date(Date.now());
  const lastWeekDate = subWeeks(currentDate, 1);
  const isNewArticle = isWithinInterval(creationDate, {
    start: lastWeekDate,
    end: currentDate,
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
      <Box p="6" d="flex" flexDir="column" height="100%">
        <Box d="flex" alignItems="baseline">
          {isNewArticle && (
            <Badge colorScheme="green" mr="2">
              New
            </Badge>
          )}
          <Box
            color="gray.500"
            fontWeight="semibold"
            letterSpacing="wide"
            fontSize="xs"
            textTransform="uppercase"
          >
            {article.meta?.readingTimeStats.text}
          </Box>
        </Box>

        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          isTruncated
        >
          {article.frontmatter?.title}
        </Box>

        <Box flex="1">{article.frontmatter?.excerpt}</Box>

        <Box d="flex" mt="2" alignItems="center">
          <StarIcon color="teal.500" />
          <Box as="span" ml="2" color="gray.600" fontSize="sm">
            {article?.stargazers?.length ?? "0"} stars
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
