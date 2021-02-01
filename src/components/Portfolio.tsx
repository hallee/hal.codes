import React from 'react'
import styled from 'styled-components'
import useImage from './Hooks/useImage'
import usePages from './Hooks/usePages'
import usePastelColor from './Hooks/usePastelColor'
import Img from 'gatsby-image'
import { Link } from 'gatsby'
import { constants, fullWidth } from './Styles'


const Article = styled.article`
	margin-top: 1em;
	.intro p {
		margin: 0 0 1em 0;
	}
	ul {
		column-count: 2;
		padding: 0 1em;
		vertical-align: top;
		${fullWidth};
		@media (max-width: ${constants.mobile}) {
			column-count: 1;
		}
		li:not(.intro) {
			margin-top: 1em;
			position: relative;
			border-radius: 0.5em;
			vertical-align: top;
			overflow: visible !important;
			& > a {
				display: inline-block;
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				overflow: hidden;
				opacity: 1;
				z-index: 100;
				transition: transform .3s cubic-bezier(0.175, 0.9, 0.32, 1.3) !important;
				&:hover {
					z-index: 1000;
					@media (min-width: ${constants.mobile}) {
						@-moz-document url-prefix() {
							padding: 1px 0; /* Firefox rendering bug fix */
						}
						overflow: visible;
						transform: scale(1.01);
					}
				}
				&:active {
					transform: none;
				}
				div, picture, img {
					overflow: visible !important;
					pointer-events: none;
					user-select: none;
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden;
					transform: translate3d(0, 0, 0);
				}
				img {
					margin-top: -8%;
				}
			}
			&:before {
				content: "";
				display: inline-block;
				padding-bottom: 116%;
				@media (max-width: ${constants.mobile}) {
					padding-bottom: 80%;
				}
			}
		}
	}
`

export default function Portfolio(props: { children?: JSX.Element }) {
	const pages = usePages()
		.filter(page => page.path.includes('portfolio/'))
		.sort((a, b) => (
			Date.parse(a.context?.frontmatter?.date ?? '') <
			Date.parse(b.context?.frontmatter?.date ?? '') ? 1 : -1
		))

	return (
		<Article>
			<ul>{props.children && (<li className='intro'><div>{props.children}</div></li>)}{
				pages?.map(page => {
					const image = useImage(page.context?.frontmatter?.featuredImage)?.fluid
					if (!image) {
						return null
					}
					const color = usePastelColor(page.context?.frontmatter?.title)
					return (
						<li key={page.path} style={ { backgroundColor: color } }>
							<Link to={page.path}>
								<Img fluid={image} alt={page.context?.frontmatter?.title} />
							</Link>
						</li>
					)
				})
			}</ul>
		</Article>
	)
}
