import React from 'react'
import { Link } from 'gatsby'
{/* import styles from './Pagination.module.scss'; */}

export default function Pagination(props: {
	prevPagePath: string;
	nextPagePath: string;
	hasPrevPage: boolean;
	hasNextPage: boolean;
}) {
	return (
		<section>
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
		</section>
	)
}
