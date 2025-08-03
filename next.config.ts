import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   config.resolve.alias = {
  //     ...config.resolve.alias,
  //     react: require.resolve('react'),
  //     'react-dom': require.resolve('react-dom')
  //   }
  //   return config
  // },
  // turbopack:  {
  //   resolveAlias: {
  //     // Force Single React instance
  //     'react': require.resolve('react'),
  //     'react-dom': require.resolve('react-dom'),
  //     'react/jsx-runtime': require.resolve('react/jsx-runtime'),
  //     'react/jsx-dev-run time': require.resolve('react/jsx-dev-runtime'),
  //   },
  //   resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.mjs', '.json'],
  // },
  /* config options here */
};

export default nextConfig;
