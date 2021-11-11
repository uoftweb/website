module.exports = {
  async redirects() {
    return [
      {
        source: "/projects/apply",
        destination:
          "https://docs.google.com/forms/d/e/1FAIpQLSelxbxxBAsQlVCugns9Mfs6AueZtyan60qX8ET8pIaSF6XcqQ/viewform",
        permanent: false,
      },
      {
        source: "/resources/design",
        destination:
          "https://docs.google.com/document/d/1Md0Ba5wPPw-Qeu1-FOtnF_qV7ltgYCyhkKA63P3K9kE",
        permanent: false,
      },
      {
        source: "/discord",
        destination: "https://discord.gg/J4ZhUxg",
        permanent: false,
      },
    ];
  },
};
