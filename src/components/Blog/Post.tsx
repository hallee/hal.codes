import React from 'react'
import PropTypes from 'prop-types'
import { parse } from 'node-html-parser'
import Layout from '../Layout'
import PostBody from './PostBody'
import SEO from '../SEO'

const Post = ({ pageContext }) => {
	const { node, next } = pageContext
	return (
		<Layout readNext={ next ? [next] : null }>
			<SEO
				title={ node.title }
				description={ parse(node.preview.html).structuredText }
				article={ true }
				/*date={ node.meta.published }*/
				image={ node.featuredImage }
			/>
			<section>
				<PostBody node={ node } />
			</section>
		</Layout>
	)
}

Post.propTypes = {
	pageContext: PropTypes.shape({
		node: PropTypes.object.isRequired,
		next: PropTypes.arrayOf(PropTypes.object),
	}).isRequired,
}


export default Post
