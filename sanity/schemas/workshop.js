export default {
  name: "workshop",
  title: "Workshop",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      validation: (Rule) => Rule.required(),
      options: {
        source: "title",
        maxLength: 96,
      },
    },
    {
      name: "excerpt",
      title: "Excerpt",
      type: "string",
    },
    {
      name: "mainImage",
      title: "Main Image",
      type: "image",
    },
    {
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    },
    {
      name: "start",
      title: "Starts at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "end",
      title: "Ends at",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "youtubeVideo",
      title: "YouTube Video",
      type: "youtube",
    },
    {
      name: "shownotes",
      title: "Shownotes",
      type: "markdown",
    },
  ],

  preview: {
    select: {
      title: "title",
      author: "author.name",
      media: "mainImage",
    },
    prepare(selection) {
      const { author } = selection;
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      });
    },
  },
};
