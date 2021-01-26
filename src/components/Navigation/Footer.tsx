import React from 'react'
import { Link } from 'gatsby'
import PixelFoundry from './PixelFoundry/PixelFoundry'
import styled from 'styled-components'
import { barStyle, theme } from '../Styles'

const StyledFooter = styled.footer`
	${barStyle}
	color: #a0a0a0;
	border-top: ${theme.border};
	margin-top: 6em;
	font-size: 14px;
	a, a:visited {
		color: #a0a0a0;
		text-decoration: none;
		padding: 0.75rem;
	}
	a:hover {
		color: ${theme.accent};
	}
	ul {
		display: grid;
		grid-auto-flow: column;
		text-align: right;
		list-style: none;
		margin: 0.5rem -0.75rem;
	}
`

export default function Footer() {
	return (
		<StyledFooter>
			<ul>
				<li><Link to="/privacy-policy">Privacy Policy</Link></li>
				<li><Link to="/privacy-policy">Another Link</Link></li>
			</ul>
		</StyledFooter>
	)
}
