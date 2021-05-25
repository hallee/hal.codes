import React from 'react'
import styled from 'styled-components'
import useImage from './Hooks/useImage'
import { GatsbyImage, StaticImage } from 'gatsby-plugin-image'

const Aside = styled.aside`
&.screenshot {
	justify-self: center;
	max-width: 550px;
	display: grid;
	.screen {
		max-width: 71.6%;
		margin: -17.5% 0 0 4.5%;
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
`

export default function DeviceScreenshot(
	props: {
		screenshot: string;
		alt?: string;
	}
) {
	const screenshot = useImage(props.screenshot)?.gatsbyImageData
	if (!screenshot) {
		return null
	}
	return (
		<Aside className={'screenshot'}>
			<GatsbyImage image={screenshot} alt="" className="screen" />
			<StaticImage src="../images/12-pro-frame.png" placeholder="none" alt={props.alt ?? ''} className="frame" />
		</Aside>
	)
}
