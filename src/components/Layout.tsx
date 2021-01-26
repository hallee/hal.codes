import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Navigation from './Navigation/Navigation'
import Footer from './Navigation/Footer'
import SEO from './SEO'
import styled, { createGlobalStyle } from 'styled-components'
import { Reset } from 'styled-reset'
import { fullWidth, theme } from './Styles'

const GlobalStyle = createGlobalStyle`
	body {
		background-color: ${theme.background};
	}
`
const Container = styled.div`
	color: ${theme.contentColor};
	font-family: ${theme.fontStack};
	font-size: 20px;
	@media only screen and (max-width: 600px) {
		font-size: 16px;
	}
	max-width: ${theme.containerWidth};
	margin: 0 auto;
	padding: 0 1em;
	main {
		display: grid;
		align-items: center;
		p, ul, ol {
			margin: 1em 0 0;
		}
	}
	.gatsby-resp-image-wrapper {
		${fullWidth}
	}
	h1, h2, h3, h4, h5, h6 {
		font-family: ${theme.headingFontStack};
		color: ${theme.headingColor};
		font-weight: 800;
		margin: 1em 0 0;
		line-height: 1;
	}
	h1 {
		font-size: 2em;
		margin-top: 0;
	}
	p, li {
		line-height: 1.4;
	}
	a {
		color: ${theme.accentLight};
		text-decoration: none;
		transition: all 150ms ease-out;
	}
	a:hover {
		color: ${theme.accent};
	}
`

export default function Layout(props: { children: JSX.Element; pageContext }) {
	const shortcodes = { } // components available in MDX
	const { title, description } = props.pageContext?.frontmatter ?? {}
	return (
		<MDXProvider components={shortcodes}>
			<Reset />
			<GlobalStyle />
			<Container>
				<SEO title={title} description={description} />
				<Navigation/>
				<main>
					{ props.children }
				</main>
				<Footer />
			</Container>
		</MDXProvider>
	)
}
