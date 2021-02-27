/* eslint-disable @typescript-eslint/no-var-requires */
const url = require('url');

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
			resolve: 'gatsby-plugin-fathom',
			options: {
				trackingUrl: 'stats.hal.codes',
				siteId: 'TKENP',
			},
		},
		{
			resolve: 'gatsby-source-graphql',
			options: {
				typeName: 'BlogPost',
				fieldName: 'blog',
				url: 'https://api.hal.codes/graphql',
			}
		},
		{
			resolve: 'gatsby-plugin-sharp',
			options: {
				stripMetadata: false
			}
		},
		'gatsby-transformer-sharp',
		'gatsby-image',
		'gatsby-remark-embedder',
		'gatsby-plugin-twitter',
		'gatsby-plugin-catch-links',
		'gatsby-plugin-offline',
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
		{
			resolve: 'gatsby-plugin-feed',
			options: {
				feeds: [
					{
						serialize: ({ query: { site, blog } }) => (
							blog.blogPosts.nodes.map(node => (
								Object.assign({}, node.title, {
									title: node.title,
									date: node.meta.published,
									url: url.resolve(`${site.siteMetadata.siteUrl}/blog/`, node.slug),
									guid: url.resolve(`${site.siteMetadata.siteUrl}/blog/`, node.slug),
									customElements: [{ 'content:encoded': node.body.html }],
								})
							))
						),
						query: `
							{
								blog {
									blogPosts(per: 20) {
										nodes {
											title
											kicker
											body {
												html
											}
											slug
											meta {
												published
											}
										}
									}
								}
							}
						`,
						output: '/blog/index.xml',
						title: 'Hal Lee',
						match: '^/blog',
					},
				],
			},
		},
	],
}
