/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

exports.createPages = async({ graphql, actions }) => {
	const { createPage } = actions

	const perPage = 2

	const pages = await graphql(`
		{
			blog {
				blogPosts(per: ${perPage}) {
					pageInfo {
						size
						total
					}
				}
			}
		}
	`)

	const { size, total } = pages.data.blog.blogPosts.pageInfo
	const pageCount = Math.max(total, 1)

	for (let i = 1; i <= pageCount; i += 1) {
		const pageQuery = await graphql(`
			{
				blog {
					blogPosts(per: ${perPage}, page: ${i}) {
						nodes {
							title
							kicker
							featuredImage
							body {
								html
							}
							preview {
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
		`)
		createPage({
			path: i === 1 ? '/blog' : `/blog/page/${i}`,
			component: path.resolve('./src/components/Blog/Page.tsx'),
			context: {
				data: pageQuery.data,
				currentPage: i,
				perPage: size,
				prevPagePath: i <= 2 ? '/blog' : `/blog/page/${i - 1}`,
				nextPagePath: `/blog/page/${i + 1}`,
				hasPrevPage: i !== 1,
				hasNextPage: i < total,
			},
		})
		const { nodes } = pageQuery.data.blog.blogPosts
		nodes.forEach((node, i) => {
			const next = nodes[i + 1] ? nodes[i + 1] : nodes[0]
			createPage({
				path: `/blog/${node.slug}`,
				component: path.resolve('./src/components/Blog/Post.tsx'),
				context: {
					node,
					next,
				},
			})
		})
	}
}
