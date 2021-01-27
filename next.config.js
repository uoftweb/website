module.exports = {
  async redirects() {
    return [
      {
        source: "/resources/design",
        destination:
          "https://docs.google.com/document/d/1Md0Ba5wPPw-Qeu1-FOtnF_qV7ltgYCyhkKA63P3K9kE",
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
