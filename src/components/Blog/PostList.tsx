import React from 'react'
import PostBody from './PostBody'

export default function PostList(props: { nodes }) {
	return (
		<section>
			{ props.nodes && (
				props.nodes.map(node => (
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
}
