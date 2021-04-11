import React from 'react'
import styled from 'styled-components'
import useImage from './Hooks/useImage'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'
import { constants, fullWidth } from './Styles'

const Article = styled.article`
	display: grid;
	aside {
		&.screenshot {
			justify-self: center;
			max-width: 550px;
			display: grid;
			.screen {
				max-width: 71.2%;
				margin: -17% 0 0 4.7%;
				img {
					object-fit: contain !important;
				}
			}
			.screen, .frame {
				grid-area: 1 / 1;
			}
			.frame {
				pointer-events: none;
				z-index: 10;
			}
		}
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
		const screenshot = useImage(props.screenshot)?.gatsbyImageData
		if (!screenshot) {
			return null
		}
		return (
			<Article>
				<section>{props.children}</section>
				<aside className={'screenshot'}>
					<GatsbyImage image={screenshot} alt="" className="screen" />
					<StaticImage src="../images/12-mini-frame.png" placeholder="none" alt="" className="frame" />
				</aside>
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
