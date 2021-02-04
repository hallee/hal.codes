import React, { Fragment } from 'react'
import { parse } from 'node-html-parser'
import styled from 'styled-components'
import Layout from '../Layout'
import PostBody from './PostBody'
import SEO from '../SEO'
import { constants } from '../Styles'

const Section = styled.section`
	max-width: $small-width;
	margin: 0 auto;
	padding: 2em;
	background: var(--cardBackgroundColor);
	border-radius: ${constants.borderRadius};
	& > article {
		margin: 0;
		& > img, & > p > img, pre {
			border-radius: ${constants.borderRadius};
			margin-left: 0;
			margin-right: 0;
			max-width: 100%;
			code {
				min-width: 0;
				border-radius: ${constants.borderRadius};
			}
		}
	}
	& > h3 {
		color: var(--accentColor);
		display: block;
		user-select: none;
		text-align: center;
		margin: 0 auto;
	}
`

function ReadNext(props: { next }) {
	return (<>
		{ props.next && (
			<Section>
				<h3>→</h3>
				<PostBody
					node={ props.next }
					titleLink={ props.next.slug }
					key={ `read-next-${props.next.slug}` }
					preview
				/>
			</Section>
		)}
	</>)
}

export default function Post(props: { pageContext }) {
	const { node, next } = props.pageContext
	return (
		<Layout pageContext={props.pageContext}>
			<Fragment>
				<SEO
					title={ node.title }
					description={ parse(node.preview.html).structuredText }
					article={ true }
					image={ node.featuredImage }
				/>
				<PostBody node={ node } />
				<ReadNext next={ next } />
			</Fragment>
		</Layout>
	)
}
