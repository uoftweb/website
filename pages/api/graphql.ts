import { ApolloServer } from "apollo-server-micro";
import {
  booleanArg,
  makeSchema,
  mutationType,
  objectType,
  queryType,
  stringArg,
} from "@nexus/schema";
import { nexusPrisma } from "nexus-plugin-prisma";
import path from "path";
import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/client";

const root = process.cwd();

const User = objectType({
  name: "User",
  description: "A member of the club",
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.image();
    t.model.starredArticles();
  },
});

const Article = objectType({
  name: "Article",
  description: "A blog article on the site",
  definition(t) {
    t.id("slug");
    t.model.slug();
    t.model.stargazers();
  },
});

const Query = queryType({
  definition(t) {
    t.crud.user();
    t.crud.users();
    t.crud.article();
    t.crud.articles();
    t.field("me", {
      type: "User",
      async resolve(_root, _args, ctx) {
        const { id } = ctx?.session?.user;
        const user = await ctx.prisma.user.findOne({
          where: {
            id,
          },
        });
        return user;
      },
    });
  },
});

const Mutation = mutationType({
  definition(t) {
    t.crud.createOneArticle();
    t.field("starArticle", {
      type: "Article",
      description: "Star the given article for the current user",
      args: {
        slug: stringArg({
          required: true,
          description: "The slug of the article to star",
        }),
      },
      async resolve(_root, args, ctx) {
        const { id } = ctx?.session?.user;
        const article = await ctx.prisma.article.update({
          where: {
            slug: args.slug,
          },
          data: {
            stargazers: {
              connect: {
                id,
              },
            },
          },
        });
        return article;
      },
    });
    t.field("unstarArticle", {
      type: "Article",
      description: "Remove star for the given article for the current user",
      args: {
        slug: stringArg({
          required: true,
          description: "The slug of the article to unstar",
        }),
      },
      async resolve(_root, args, ctx) {
        const { id } = ctx?.session?.user;
        const article = await ctx.prisma.article.update({
          where: {
            slug: args.slug,
          },
          data: {
            stargazers: {
              disconnect: {
                id,
              },
            },
          },
        });
        return article;
      },
    });
  },
});

const schema = makeSchema({
  types: [User, Article, Query, Mutation],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
  outputs: {
    typegen: path.join(root, "nexus-typegen.ts"),
    schema: path.join(root, "schema.graphql"),
  },
  typegenAutoConfig: {
    sources: [
      //   {
      //     source: require.resolve(".prisma/client/index.d.ts"),
      //     alias: "prisma",
      //   },
      {
        source: require.resolve("../../context"),
        alias: "ContextModule",
      },
    ],
    contextType: "ContextModule.Context",
  },
});

const prisma = new PrismaClient();

async function context({ req }) {
  let session = null;
  try {
    session = await getSession({ req });
  } catch (e) {}
  return {
    prisma,
    session,
  };
}

const server = new ApolloServer({
  schema,
  context,
});

const handler = server.createHandler({ path: "/api/graphql" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
