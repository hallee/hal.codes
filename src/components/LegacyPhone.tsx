import React from 'react'
import styled from 'styled-components'
import useImage from './Hooks/useImage'
import Img from 'gatsby-image'
import { constants, fullWidth } from './Styles'

const Article = styled.article`
	display: grid;
	aside {
		max-width: 630px;
	}
	section {
		iframe {
			width: 100% !important; // twitter embed fix
		}
	}
	@media (min-width: ${constants.mobile}) {
		padding: 0 1em;
		${fullWidth};
		grid-template-columns: 1fr 1fr;
		align-items: start;
		aside {
			margin-right: -15%;
		}
		section {
			order: 2;
		}
	}
`

export default function LegacyPhone(props: { children?: JSX.Element; image: string }) {
	const image = useImage(props.image)?.fluid
	if (!image) {
		return null
	}
	return (
		<Article>
			<section>{props.children}</section>
			<aside><Img fluid={image} alt="" /></aside>
		</Article>
	)
}
