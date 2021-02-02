import React from 'react'
import PropTypes from 'prop-types'
import PostBody from './PostBody'

const PostList = ({ nodes }) => (
	<section>
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
	</section>
)

PostList.defaultProps = {
	nodes: [],
}

PostList.propTypes = {
	nodes: PropTypes.arrayOf(PropTypes.object.isRequired),
}

export default PostList
