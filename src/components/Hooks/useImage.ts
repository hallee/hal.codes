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
						original {
							src
						}
						fluid {
							...GatsbyImageSharpFluid_withWebp_noBase64
						}
					}
				}
			}
		`
	)
	return allImageSharp.nodes.filter(image => image.original?.src?.includes(name))[0]
}
