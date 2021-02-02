import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'
import Fragment from 'react-dom-fragment'
import parse from 'html-react-parser'
{/* import './PostBody.scss'; */}
import './code.css'

const PostBody = ({ node, titleLink, preview }) => {
	const title = titleLink ? <Link to={ `/${titleLink}` }>{ node.title }</Link> : node.title
	const continueReading = preview ? <Link className="continue" to={ `/${node.slug}` }><span>Continue reading →</span></Link> : null

	const published = new Date(node.meta.published)
	const dateString = published.toLocaleString('en-us', { month: 'long', day: 'numeric', year: 'numeric' })

	return (
		<article>
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
		</article>
	)
}

PostBody.defaultProps = {
	titleLink: null,
	preview: false,
}

PostBody.propTypes = {
	node: PropTypes.shape(PropTypes.object.isRequred).isRequired,
	titleLink: PropTypes.string,
	preview: PropTypes.bool,
}


export default PostBody
