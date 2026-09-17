/** @type {import('next').NextConfig} */
const nextConfig = {
  agentRules: false,
  async redirects() {
    return [
      // www.baitalebdaa.com is the canonical hostname — send every apex-domain
      // request there permanently so there's only ever one indexable URL per page.
      {
        source: "/:path*",
        has: [{ type: "host", value: "baitalebdaa.com" }],
        destination: "https://www.baitalebdaa.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
