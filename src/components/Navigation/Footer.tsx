import React from 'react'
import styled from 'styled-components'
import { barStyle, constants } from '../Styles'

const StyledFooter = styled.footer`
	${barStyle}
	border-top: ${constants.border};
	margin-top: 5em;
	ul {
		font-size: 0.8em;
		li:first-child {
			margin-bottom: 0.5em;
		}
		a {
			display: inline-block;
			padding: 0.4em;
			margin: 0 -0.4em;
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
				<li><a href="https://federated.hal.codes/@hal" rel="me">Mastodon</a></li>
				<li><a href="https://github.com/hallee">GitHub</a></li>
			</ul>
		</StyledFooter>
	)
}
