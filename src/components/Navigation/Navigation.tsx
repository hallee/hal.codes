import React from 'react'
import usePages from '../Hooks/usePages'
import { Link } from 'gatsby'
import { barStyle, theme } from '../Styles'
import styled from 'styled-components'
import Logo from './Logo'

const Nav = styled.nav`
	${barStyle}
	border-bottom: ${theme.border};
	margin-bottom: 4em;
`

export default function Navigation() {
	const pages = usePages()
	return (
		<Nav>
			<span>
				<Link to="/">
					<Logo />
				</Link>
			</span>
			<ul>
				{
					pages?.map(page => {
						if (
							!!page.context?.frontmatter?.navItem &&
							page.context?.frontmatter?.title
						) {
							return <li key={page.path}>
								<Link to={page.path}>
									{page.context.frontmatter.title}
								</Link>
							</li>
						}
						return null
					})
				}
			</ul>
		</Nav>
	)
}
