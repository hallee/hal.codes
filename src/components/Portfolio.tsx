import React from 'react'
import styled from 'styled-components'
import useImage from './Hooks/useImage'
import usePages from './Hooks/usePages'
import usePastelColor from './Hooks/usePastelColor'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { constants, fullWidth } from './Styles'


const Article = styled.article`
ul {
	display: grid;
	grid-auto-flow: column;
	grid-gap: 1em;
	padding: 0 1em;
	${fullWidth};
	@media (max-width: ${constants.mobile}) {
		grid-auto-flow: row;
	}

	li {
		border-radius: 0.5em;
	}
}
`

export default function Portfolio() {
	const pages = usePages()
		.filter(page => page.path.includes('portfolio/'))
		.sort((a, b) => (
			Date.parse(a.context?.frontmatter?.date ?? '') <
			Date.parse(b.context?.frontmatter?.date ?? '') ? 1 : -1
		))

	return (
		<Article>
			<ul>{
				pages?.map(page => {
					const image = useImage(page.context?.frontmatter?.featuredImage)?.fluid
					if (!image) {
						return null
					}
					const color = usePastelColor(page.context?.frontmatter?.title)
					return (
						<li key={page.path} style={ { backgroundColor: color } }>
							<Link to={page.path}>
								<Img fluid={image} alt={page.context?.frontmatter?.title} />
							</Link>
						</li>
					)
				})
			}</ul>
		</Article>
	)
}
