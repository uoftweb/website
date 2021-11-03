import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '@sanity/client';

import sanityConfig from '../sanity/sanity.json';

const client = sanityClient({
  projectId: sanityConfig.api.projectId,
  dataset: sanityConfig.api.dataset,
  token: '', // or leave blank to be anonymous user
  useCdn: process.env.NODE_ENV === 'production', // `false` if you want to ensure fresh data
});

// Get a pre-configured url-builder from your sanity client
const builder = imageUrlBuilder(client);

// Then we like to make a simple function like this that gives the
// builder an image and returns the builder for you to specify additional
// parameters:
export function urlFor(source) {
  return builder.image(source);
}

export async function getSanityContent({ query, variables = {} }) {
  const { data } = await fetch(
    'https://o0erlhhl.api.sanity.io/v1/graphql/production/default',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    },
  ).then((response) => response.json());

  return data;
}
