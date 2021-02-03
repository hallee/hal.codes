import React from 'react'
import { Link } from 'gatsby'
import Fragment from 'react-dom-fragment'
import parse from 'html-react-parser'
import styled from 'styled-components'
import { constants, fullWidth } from '../Styles'
import './code.css'

const Article = styled.article`
	display: flex;
	flex-direction: column;
	align-items: left;
	justify-content: center;
	overflow-x: visible;
	max-width: ${constants.containerWidth};
	width: 100%;
	code {
		background: #ddd;
		border-radius: 0.4em;
		font-family: ${constants.monoFontStack};
		font-size: 0.9em;
		padding: 0 0.4rem;
		margin: 0 -0.2rem;
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
			min-width: calc(${constants.containerWidth} - 2em);
			background: #2a2734;
			color: #f1ebff;
			padding: 1.2em 1.5em;
			overflow: scroll;
			word-wrap: normal;
			@media (max-width: ${constants.containerWidth}) {
				min-width: auto;
				width: 100%;
				border-radius: 0;
			}
		}
	}
	& > img, & > p > img, pre {
		${fullWidth}
	}
`

export default function PostBody(props: { node; titleLink?; preview? }) {
	const { node, titleLink = null, preview = false } = props
	const title = titleLink ? <Link to={ `${titleLink}` }>{ node.title }</Link> : node.title
	const continueReading = preview ? <Link className="continue" to={ `${node.slug}` }><span>Continue reading →</span></Link> : null

	const published = new Date(node.meta.published)
	const dateString = published.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })

	return (
		<Article>
			<span className="kicker">{ node.kicker }</span>
			<h2 className="title">
				{ title }
			</h2>
			<span className="post-date">{ dateString }</span>
			{ !preview ? (
				<Fragment>{ parse(node.body.html) }</Fragment>
			) : (
				<Fragment>{ parse(node.preview.html) }</Fragment>
			)}
			{ continueReading }
		</Article>
	)
}
