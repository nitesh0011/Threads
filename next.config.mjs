/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
          bodySizeLimit: '3mb',
        },
      },
    images:{
        remotePatterns:[
            {
                protocol: 'https',
                hostname:"img.clerk.com"
            },
            {
                protocol: 'https',
                hostname:"files.edgestore.dev"
            }
        ]
    },
 
};

export default nextConfig;
