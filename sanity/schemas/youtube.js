import React from "react";

function YouTubePreview(props) {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
}

export default {
  name: "youtube",
  type: "object",
  title: "YouTube Video",
  fields: [
    {
      name: "url",
      type: "url",
      title: "URL",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    component: YouTubePreview,
  },
};
