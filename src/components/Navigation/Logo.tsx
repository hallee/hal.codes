import React from 'react'
import logo from '../../images/logo.png'
import styled from 'styled-components'
import { constants } from '../Styles'

const Span = styled.span`
img {
	width: 165px;
	height: auto;
	@media only screen and (max-width: ${constants.mobile}) {
		width: 110px;
	}
}
`

export default function Logo() {
	return (
		<Span>
			<img src={logo} width="165" height="48" alt="hal.codes" />
		</Span>
	)
}

