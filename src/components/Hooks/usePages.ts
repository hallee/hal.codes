import { useStaticQuery, graphql } from 'gatsby'

export default function usePages() {
	const { allSitePage } = useStaticQuery<GatsbyTypes.SitePagesQuery>(
		graphql`
			query SitePages {
				allSitePage(sort: {order: ASC, fields: path}) {
					nodes {
						path
						context {
							frontmatter {
								title
								description
								navItem
							}
						}
					}
				}
			}
		`
	)
	return allSitePage.nodes
}
