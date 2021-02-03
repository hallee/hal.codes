import React from 'react'
import usePages from '../Hooks/usePages'
import { Link } from 'gatsby'
import { barStyle, constants } from '../Styles'
import styled from 'styled-components'
import Logo from './Logo'

const Nav = styled.nav`
	${barStyle}
	border-bottom: ${constants.border};
	font-family: ${constants.fontStack};
	ul {
		display: grid;
		font-size: 0.8em;
		font-weight: 600;
		grid-auto-flow: column;
		grid-gap: 1em;
		justify-items: end;
		align-items: center;
		margin-left: auto;
		margin-right: -0.75em;
	}
	li {
		[aria-current] {
			color: var(--accentColor);
		}
		a, a:visited {
			border-radius: 0.5em;
			padding: 0.5em 0.75em;
		}
		a:hover, a:active, [aria-current] {
			background-color: var(--linkBackgroundColor);
		}
	}
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
				<li><Link to='/blog'>Blog</Link></li>
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
