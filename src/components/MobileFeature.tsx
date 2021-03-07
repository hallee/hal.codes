import React from 'react'
import styled from 'styled-components'
import useImage from './Hooks/useImage'
import { GatsbyImage } from 'gatsby-plugin-image'
import { constants, fullWidth } from './Styles'

const Article = styled.article`
	display: grid;
	aside {
		&.screenshot {

		}
		&.legacy {
			max-width: 630px;
			margin-top: max(-4%, -2vw);
		}
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

export default function MobileFeature(
	props: {
		children?: JSX.Element;
		legacyPhoneImage?: string;
		screenshot?: string;
	}
) {
	if (props.screenshot) {
		const screenshot = useImage(props.screenshot)?.gatsbyImageData
		if (!screenshot) {
			return null
		}
		return (
			<Article>
				<section>{props.children}</section>
				<aside className={'screenshot'}><GatsbyImage image={screenshot} alt="" /></aside>
			</Article>
		)
	} else if (props.legacyPhoneImage) {
		const legacyImage = useImage(props.legacyPhoneImage)?.gatsbyImageData
		if (!legacyImage) {
			return null
		}
		return (
			<Article>
				<section>{props.children}</section>
				<aside className={'legacy'}><GatsbyImage image={legacyImage} alt="" /></aside>
			</Article>
		)
	}
	return null
}
