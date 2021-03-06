import { useStaticQuery, graphql } from 'gatsby'

export default function useSiteMetadata() {
	const { site } = useStaticQuery<GatsbyTypes.SiteMetaDataQuery>(
		graphql`
			query SiteMetaData {
				site {
					siteMetadata {
						siteName
						title
						description
						siteUrl
						githubUsername
						twitterUsername
					}
				}
			}
		`
	)
	return site?.siteMetadata
}
