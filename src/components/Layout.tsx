import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Navigation from './Navigation/Navigation'
import Footer from './Navigation/Footer'
import SEO from './SEO'
import styled, { createGlobalStyle } from 'styled-components'
import { Reset } from 'styled-reset'
import { constants, fullWidth, lightTheme } from './Styles'

const GlobalStyle = createGlobalStyle`
	${lightTheme}
	body {
		background-color: var(--backgroundColor);
		color: var(--contentColor);
		font-family: ${constants.fontStack};
		font-size: 20px;
	}
`
const Container = styled.div`
	@media only screen and (max-width: ${constants.mobile}) {
		font-size: 16px;
	}
	max-width: ${constants.containerWidth};
	margin: 0 auto;
	padding: 0 1em;
	main {
		display: grid;
		align-items: center;
		p, ul, ol {
			margin: 1em 0 0;
		}
		a {
			color: var(--accentColor);
			opacity: 0.66;
		}
		a:hover {
			opacity: 1;
		}
	}
	.gatsby-resp-image-wrapper {
		${fullWidth}
	}
	h1, h2, h3, h4, h5, h6 {
		font-family: ${constants.headingFontStack};
		color: var(--headingColor);
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

		text-decoration: none;
		transition: color 150ms ease-out, opacity 150ms ease-out, background 150ms ease-out;
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
