import React, { Fragment } from 'react'
import { parse } from 'node-html-parser'
import Layout from '../Layout'
import PostBody from './PostBody'
import SEO from '../SEO'

export default function Post(props: { pageContext }) {
	const { node, next } = props.pageContext
	return (
		<Layout pageContext={props.pageContext}>
			<Fragment>
				<SEO
					title={ node.title }
					description={ parse(node.preview.html).structuredText }
					article={ true }
					/*date={ node.meta.published }*/
					image={ node.featuredImage }
				/>
				<PostBody node={ node } />
				{/* <ReadNext next={next} /> */}
			</Fragment>
		</Layout>
	)
}
