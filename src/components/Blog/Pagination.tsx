import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

{/* import styles from './Pagination.module.scss'; */}

const Pagination = ({
	prevPagePath,
	nextPagePath,
	hasPrevPage,
	hasNextPage,
}) => (
	<section>
		<div>
			{ hasPrevPage && (
				<Link
					rel="prev"
					to={ prevPagePath }
				>
					Newer
				</Link>
			)}
		</div>
		<div>
			{ hasNextPage && (
				<Link
					rel="next"
					to={ nextPagePath }
				>
					Older
				</Link>
			)}
		</div>
	</section>
)

Pagination.propTypes = {
	prevPagePath: PropTypes.string.isRequired,
	nextPagePath: PropTypes.string.isRequired,
	hasPrevPage: PropTypes.bool.isRequired,
	hasNextPage: PropTypes.bool.isRequired,
}

export default Pagination
