import React from 'react'
import { Link } from 'gatsby'
import parse from 'html-react-parser'
import styled from 'styled-components'
import { constants, fullWidth, popAnimation } from '../Styles'
import * as code from './code.css'

const Article = styled.article`
	${code}
	max-width: ${constants.containerWidth};
	width: 100%;
	margin-bottom: 8em;
	span.kicker {
		display: block;
		color: var(--accentColor);
		margin: 1em 0 0.5em;
	}
	time {
		display: block;
		opacity: 0.5;
		margin: 0.5em 0 0;
	}
	h2.title {
		margin: 0;
	}
	code {
		background: #ddd;
		border-radius: ${constants.borderRadius};
		font-family: ${constants.monoFontStack};
		font-size: 0.9em;
		padding: 0 0.4rem;
		margin: 0;
	}
	pre {
		display: flex;
		line-height: 1.5;
		margin: 1em 0 0;
		justify-content: center;
		::-webkit-scrollbar-corner, ::-webkit-scrollbar {
			display: none;
		}
		code {
			min-width: calc(${constants.containerWidth} - 3em);
			background: #2a2734;
			color: #f1ebff;
			padding: 1.2em 1.5em;
			overflow: scroll;
			word-wrap: normal;
			@media (max-width: ${constants.containerWidth}) {
				min-width: 0;
				width: 100%;
				border-radius: 0;
			}
		}
	}
	& > img, & > p > img, pre {
		${fullWidth}
	}
	a.continue {
		display: block;
		font-size: 0.8em;
		margin: 2em 0 0;
		color: var(--accentColor);
		-webkit-tap-highlight-color: transparent;
		span {
			display: inline-block;
			background: var(--accentColorFaint);
			border-radius: ${constants.borderRadius};
			padding: 1em 1.8em;
			${popAnimation}
		}
		&:hover {
			opacity: 0.7;
		}
	}
`

export default function PostBody(props: { node; titleLink?; preview? }) {
	const { node, titleLink = null, preview = false } = props
	const title = titleLink ? <Link to={ `/blog/${titleLink}/` }>{ node.title }</Link> : node.title
	const continueReading = preview ? <Link className="continue" to={ `/blog/${node.slug}/` }><span>Continue reading →</span></Link> : null

	const published = new Date(node.meta.published)
	const dateString = published.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })

	return (
		<Article>
			<span className="kicker">{ node.kicker }</span>
			<h2 className="title">
				{ title }
			</h2>
			<time>{ dateString }</time>
			{ !preview ? (
				<>{ parse(node.body.html) }</>
			) : (
				<>{ parse(node.preview.html) }</>
			)}
			{ continueReading }
		</Article>
	)
}
