import React from 'react'
import styled from 'styled-components'
import { barStyle, constants } from '../Styles'

const StyledFooter = styled.footer`
	${barStyle}
	border-top: ${constants.border};
	margin-top: 5em;
	ul {
		font-size: 0.8em;
		a {
			display: block;
			padding: 0.3em 0 0.2em;
			&:hover {
				text-decoration: underline;
			}
		}
	}
	ul.contact {
		text-align: right;
	}
`

export default function Footer() {
	return (
		<StyledFooter>
			<ul>
				<li>🍻</li>
				<li><a href="https://github.com/hallee/hal.codes">This site is open source</a></li>
			</ul>
			<ul className="contact">
				<li>👋</li>
				<li><a href="https://twitter.com/hal_lee">Twitter</a></li>
				<li><a href="https://github.com/hallee">GitHub</a></li>
			</ul>
		</StyledFooter>
	)
}
