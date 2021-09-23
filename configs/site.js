const GITHUB_BASE_URL = "https://github.com/uoftweb/website";
const SITE_BASE_URL = "https://uoftweb.dev"

export const siteConfig = {
  siteName: "UofT Web Development Club",
  url: SITE_BASE_URL,
  description:
    "Join our collective of student designers, developers, and creators today",
  titleTemplate: "%s | UofT Web Development Club",
  images: [{
    url: `${SITE_BASE_URL}/og-image.png`,
    width: 800,
    height: 600,
    alt: 'UofT Web Development Club Logo',
  }],
  facebook: {
    username: "uoftweb",
    url: "https://www.facebook.com/uoftweb",
  },
  github: {
    url: GITHUB_BASE_URL,
    editUrl: `${GITHUB_BASE_URL}/edit/develop`,
    blobUrl: `${GITHUB_BASE_URL}/blob/develop`,
  },
  discord: {
    url: "https://discord.gg/J4ZhUxg",
  },
};
