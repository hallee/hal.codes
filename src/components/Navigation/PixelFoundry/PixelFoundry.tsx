import React from 'react'
import logo from './pixel-foundry.png'
import styled from 'styled-components'

const Span = styled.span`
	a {
		display: inline-block;
		padding: 1em 0;
		filter: grayscale(1);
		opacity: 0.2;
	}
	a:hover {
		filter: none;
		opacity: 1;
	}
	img {
		width: 101px;
		height: auto;
	}
`

export default function PixelFoundry() {
	return (
		<Span>
			<a href="https://pixelfoundry.io">
				<img src={logo} width="101" height="36" alt="Pixel Foundry" loading="lazy" />
			</a>
		</Span>
	)
}
