import React from 'react'
import styled from 'styled-components'
import DeviceScreenshot from './DeviceScreenshot'
import useImage from './Hooks/useImage'
import { GatsbyImage } from 'gatsby-plugin-image'
import { constants, fullWidth } from './Styles'

const Article = styled.article`
	display: grid;
	aside {
		&.legacy {
			max-width: 630px;
			margin-top: max(-4%, -2vw);
		}
	}
	section {
		align-self: bottom;

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
			margin-right: -10%;
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
		return (
			<Article>
				<section>{props.children}</section>
				<DeviceScreenshot screenshot={props.screenshot} />
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
