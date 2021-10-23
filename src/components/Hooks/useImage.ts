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
						gatsbyImageData(placeholder: NONE)
						parent {
							... on File {
								name
							}
						}
					}
				}
			}
		`
	)
	return allImageSharp.nodes.filter(
		image => image.parent.name === name
	)[0]
}
