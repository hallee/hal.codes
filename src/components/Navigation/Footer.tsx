import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { barStyle, constants } from '../Styles'

const StyledFooter = styled.footer`
	${barStyle}
	border-top: ${constants.border};
	margin-top: 4em;
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
