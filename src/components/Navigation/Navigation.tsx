import React from 'react'
import Img from 'gatsby-image'
import usePages from '../Hooks/usePages'
import useSiteMetadata from '../Hooks/useSiteMetadata'
import { Link } from 'gatsby'
import { barStyle, theme } from '../Styles'
import styled from 'styled-components'

const Nav = styled.nav`
	${barStyle}
	border-bottom: ${theme.border};
	margin-bottom: 4em;
	ul a, ul a:visited, span a, span a:visited {
		color: ${theme.contentColorSecondary};
		display: inline-block;
		border-radius: 0.75em;
		padding: 0.333em 0.75em;
		&:hover {
			color: ${theme.accent};
			background-color: ${theme.linkBackground};
		}
	}

	& > span {
		margin-left: -0.5em;
		a, a:visited {
			font-weight: 800;
			color: ${theme.headingColor};
			display: grid;
			grid-template-columns: 1.6em 1fr;
			grid-column-gap: 0.25em;
			align-items: center;
			filter: grayscale(1);
			opacity: 0.6;
			padding: 0.5em;
		}
		a:hover {
			filter: none;
			opacity: 1;
		}
	}

	ul {
		font-weight: 500;
		font-size: 0.8em;
		display: inline-grid;
		grid-auto-flow: column;
		grid-auto-columns: min-content;
		grid-column-gap: 1em;
		align-items: center;
		margin: 0 -0.75em 0 0;
		padding: 0;
		list-style: none;
		justify-self: end;
		justify-items: end;
		li {
			[aria-current] {
				color: ${theme.accent};
			}
			display: inline-block;
		}
	}
`

export default function Navigation() {
	const pages = usePages()
	const siteMetadata = useSiteMetadata()
	const siteName = siteMetadata?.siteName
	const appIcon = null
	return (
		<Nav>
			<span>
				<Link to="/">
					{ appIcon &&
						<Img fluid={appIcon} alt="" />
					}
					{siteName}
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
