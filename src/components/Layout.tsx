import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import Navigation from './Navigation/Navigation'
import Footer from './Navigation/Footer'
import MobileFeature from './MobileFeature'
import Portfolio from './Portfolio'
import SEO from './SEO'
import styled, { createGlobalStyle } from 'styled-components'
import { Reset } from 'styled-reset'
import { constants, lightTheme } from './Styles'
import * as fontFaces from './Fonts/fonts.css'

const GlobalStyle = createGlobalStyle`
	${fontFaces}
	${lightTheme}
	body {
		background-color: var(--backgroundColor);
		color: var(--contentColor);
		font-family: ${'"PlexSans", ' + constants.fontStack};
		font-size: 20px;
	}
`
const Container = styled.div`
	@media (max-width: ${constants.mobile}) {
		font-size: 16px;
	}
	max-width: ${constants.containerWidth};
	margin: 0 auto;
	padding: 0 1em;
	main {
		p {
			margin: 1em 0 0;
		}
		a {
			color: var(--accentColor);
		}
		a:hover {
			opacity: 0.66;
		}
	}
	h1, h2, h3, h4, h5, h6 {
		font-family: ${constants.headingFontStack};
		color: var(--headingColor);
		font-weight: 800;
		margin: 1em 0 0;
		line-height: 1;
		a {
			color: var(--headingColor);
			&:hover {
				text-decoration: underline;
				opacity: 1;
			}
		}
	}
	h1, h2 {
		font-size: 2em;
		margin-top: 1rem;
	}
	h3 {
		font-size: 1.5em;
	}
	h4 {
		font-size: 1.3em;
	}
	p, li {
		font-size: 1em;
		line-height: 1.4;
	}
	a {
		text-decoration: none;
		transition: color 150ms ease-out, opacity 150ms ease-out, background 150ms ease-out;
	}
	blockquote {
		padding-left: 1em;
		border-left: 3px solid var(--accentColor);
	}
`

export default function Layout(props: { children: JSX.Element; pageContext }) {
	const shortcodes = { MobileFeature, Portfolio } // components available in MDX
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
