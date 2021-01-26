module.exports = {
  siteMetadata: {
    siteName: 'hal.codes',
    title: 'Hal Lee, software developer in NYC',
    description: 'Hal is a software engineer and iOS app developer based in Brooklyn.',
    siteUrl: 'https://hal.codes',
    githubUsername: 'hallee',
    twitterUsername: '@hal_lee',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        stripMetadata: false
      }
    },
    'gatsby-transformer-sharp',
    'gatsby-image',
    'gatsby-plugin-typegen',
    'gatsby-remark-embedder',
    'gatsby-plugin-twitter',
    'gatsby-plugin-catch-links',
    {
      resolve: 'gatsby-plugin-page-creator',
      options: {
        path: './content',
      },
    },
    'gatsby-plugin-remove-trailing-slashes',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-plugin-mdx',
      options: {
        extensions: ['.md', '.mdx'],
        defaultLayouts: {
          default: require.resolve('./src/components/Layout.tsx'),
        },
        gatsbyRemarkPlugins: ['gatsby-remark-embedder'],
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './content',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: './src/images',
      },
    },
  ],
}
