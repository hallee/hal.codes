import React, { Fragment } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../Layout'
import PostBody from './PostBody'

const Section = styled.section`
	padding: 1em;
	margin: 12em auto 4em auto;
	display: flex;
	justify-content: space-between;
`

function Pagination(props: {
	prevPagePath: string;
	nextPagePath: string;
	hasPrevPage: boolean;
	hasNextPage: boolean;
}) {
	return (
		<Section>
			<div>
				{ props.hasPrevPage && (
					<Link
						rel="prev"
						to={ props.prevPagePath }
					>
						Newer
					</Link>
				)}
			</div>
			<div>
				{ props.hasNextPage && (
					<Link
						rel="next"
						to={ props.nextPagePath }
					>
						Older
					</Link>
				)}
			</div>
		</Section>
	)
}

export default function BlogPage(props: { pageContext }) {
	const {
		data,
		prevPagePath,
		nextPagePath,
		hasPrevPage,
		hasNextPage,
	} = props.pageContext

	const nodes = data.blog?.blogPosts?.nodes

	return (
		<Layout pageContext={props.pageContext}>
			<Fragment>
				{ nodes && (
					nodes.map(node => (
						<PostBody
							node={ node }
							titleLink={ node.slug }
							key={ node.slug }
							preview
						/>
					))
				)}
				<Pagination
					prevPagePath={ prevPagePath }
					nextPagePath={ nextPagePath }
					hasPrevPage={ hasPrevPage }
					hasNextPage={ hasNextPage }
				/>
			</Fragment>
		</Layout>
	)
}
