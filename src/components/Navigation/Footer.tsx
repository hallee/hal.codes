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
	a {
		padding: 0.5em;
		margin: 0 -0.5em;
	}
	a, a:visited {
		color: #a0a0a0;
		text-decoration: none;
	}
	a:hover {
		color: ${theme.accent};
	}
	ul {
		text-align: right;
		list-style: none;
	}
`

export default function Footer() {
	return (
		<StyledFooter>
			<PixelFoundry />
			<ul>
				<li><Link to="/privacy-policy">Privacy Policy</Link></li>
			</ul>
		</StyledFooter>
	)
}
