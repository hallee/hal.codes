import React, { Fragment } from 'react'
import Layout from '../Layout'
import PostList from './PostList'
import Pagination from './Pagination'

export default function IndexTemplate(props: { pageContext }) {
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
				<PostList nodes={ nodes } />
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
