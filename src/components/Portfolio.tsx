import React from 'react'
import styled from 'styled-components'
import useImage from './Hooks/useImage'
import usePages from './Hooks/usePages'
import withMasonryGridLayout from './Hooks/withMasonryGridLayout'
import usePastelColor from './Hooks/usePastelColor'
import DeviceScreenshot from './DeviceScreenshot'
import { GatsbyImage } from 'gatsby-plugin-image'
import { Link } from 'gatsby'
import { constants, fullWidth, popAnimation } from './Styles'

const Article = styled.article`
	.intro p {
		margin: 0 0 1em 0;
		&:last-child {
			margin: 0;
		}
	}
	ul {
		display: grid;
		grid-template-rows: masonry;
		gap: 1em;
		vertical-align: top;
		@media (min-width: ${constants.mobile}) {
			grid-template-columns: repeat(2, 1fr);
		}
		@supports not (grid-template-rows: masonry) {
			@media (min-width: ${constants.mobile}) {
				grid-auto-rows: 1px;
			}
		}
		${fullWidth};
		padding: 1em;
		li:not(.intro) {
			border-radius: ${constants.borderRadius};
			background-color: var(--project-background-color);
			@supports (color: color(display-p3 1 1 1)) {
				background-color: var(--project-background-color-p3);
			}
			overflow: hidden;
			&:hover {
				z-index: 1000;
				@media (min-width: ${constants.mobile}) {
					overflow: visible;
				}
			}
			& > a {
				display: block;
				border-radius: ${constants.borderRadius};
				opacity: 1;
				z-index: 100;
				@media (max-width: ${constants.mobile}) {
					max-height: 90vw;
				}
				& > .gatsby-image-wrapper {
					margin: -2em -4em -9em -1em;
					z-index: 101;
					@media (min-width: ${constants.mobile}) {
						${popAnimation}
						&:hover {
							z-index: 1001;
							transform: scale(1.01);
						}
					}
				}
				& > div.screenshot {
					margin: -4em -4em -6em 1em;
					max-height: min(70vw, 700px);
					z-index: 101;
					& > aside {
						transform: rotate(15deg);
					}
					@media (min-width: ${constants.mobile}) {
						${popAnimation}
						&:hover {
							z-index: 1001;
							transform: scale(1.01);
						}
					}
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

	withMasonryGridLayout('ul.grid', 'ul.grid > li')

	return (
		<Article>
			<ul className="grid">{props.children && (<li className="intro"><div>{props.children}</div></li>)}{
				pages?.map(page => {
					const color = usePastelColor(page.context?.frontmatter?.title)
					if (page.context?.frontmatter?.screenshot) {
						return (
							<li
							key={page.path}
							style={{
								'--project-background-color': color.sRGB,
								'--project-background-color-p3': color.p3,
							}}>
								<Link to={page.path}>
									<div className="screenshot">
										<DeviceScreenshot
											screenshot={page.context.frontmatter.screenshot}
											alt={page.context?.frontmatter?.title}
										/>
									</div>
								</Link>
							</li>
						)
					} else {
						const image = useImage(page.context?.frontmatter?.featuredImage)?.gatsbyImageData
						if (!image) {
							return null
						}
						return (
							<li
							key={page.path}
							style={{
								'--project-background-color': color.sRGB,
								'--project-background-color-p3': color.p3,
							}}>
								<Link to={page.path}>
									<GatsbyImage image={image} alt={page.context?.frontmatter?.title} />
								</Link>
							</li>
						)
					}
				})
			}</ul>
		</Article>
	)
}
