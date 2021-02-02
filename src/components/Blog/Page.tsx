import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Layout from '../Layout'
import PostList from './PostList'
import Pagination from './Pagination'

const IndexTemplate = ({ pageContext }) => {
	const {
		data,
		currentPage,
		prevPagePath,
		nextPagePath,
		hasPrevPage,
		hasNextPage,
	} = pageContext

	const nodes = data.blog.blogPosts ? data.blog.blogPosts.nodes : null
	// const pageTitle = currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

	return (
		<Layout pageContext={pageContext}>
			<Fragment>
				<PostList nodes={ nodes } />
				<Pagination
					currentPage={ currentPage }
					prevPagePath={ prevPagePath }
					nextPagePath={ nextPagePath }
					hasPrevPage={ hasPrevPage }
					hasNextPage={ hasNextPage }
				/>
			</Fragment>
		</Layout>
	)
}

IndexTemplate.propTypes = {
	pageContext: PropTypes.shape(PropTypes.object).isRequired,
}

export default IndexTemplate
