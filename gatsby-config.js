/* eslint-disable @typescript-eslint/no-var-requires */
const url = require('url')

const siteMetadata = {
	siteName: 'hal.codes',
	title: 'Hal Lee, software developer in NYC',
	description: 'Hal is a software engineer and iOS app developer based in Brooklyn.',
	siteUrl: 'https://hal.codes',
	githubUsername: 'hallee',
	twitterUsername: '@hal_lee',
}

module.exports = {
	siteMetadata,
	plugins: [
		{
			resolve: 'gatsby-source-graphql',
			options: {
				typeName: 'BlogPost',
				fieldName: 'blog',
				url: 'https://api.hal.codes/graphql',
			}
		},
		'gatsby-remark-embedder',
		'gatsby-plugin-twitter',
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		'gatsby-plugin-image',
		'gatsby-plugin-catch-links',
		{
			resolve: 'gatsby-plugin-page-creator',
			options: {
				path: './content',
			},
		},
		'gatsby-plugin-remove-serviceworker',
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
									url: url.resolve(`${site.siteMetadata.siteUrl}/blog/`, `${node.slug}/`),
									guid: url.resolve(`${site.siteMetadata.siteUrl}/blog/`, `${node.slug}/`),
									custom_elements: [{ 'content:encoded': node.body.html }],
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
						output: '/blog/rss.xml',
						title: 'Hal Lee',
						match: '^/blog/',
						guid: `${siteMetadata.siteUrl}/blog/rss.xml`,
						site_url: `${siteMetadata.siteUrl}/blog/`,
						feed_url: `${siteMetadata.siteUrl}/blog/rss.xml`,
					},
				],
			},
		},
	],
}
