import { useStaticQuery, graphql } from 'gatsby'

export default function useImage(name?: string) {
	if (! name) {
		return
	}
	const { allImageSharp } = useStaticQuery<GatsbyTypes.AllImagesQuery>(
		graphql`
			query AllImages {
				allImageSharp {
					nodes {
						fluid {
							originalName
							...GatsbyImageSharpFluid_withWebp_noBase64
						}
					}
				}
			}
		`
	)
	return allImageSharp.nodes.filter(
		image => image.fluid?.originalName?.split('.').slice(0, -1).join('.') === name
	)[0]
}
