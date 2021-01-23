module.exports = {
  async redirects() {
    return [
      {
        source: "/projects/apply",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSelxbxxBAsQlVCugns9Mfs6AueZtyan60qX8ET8pIaSF6XcqQ/viewform",
        permanent: false,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }

    return config;
  },
};
