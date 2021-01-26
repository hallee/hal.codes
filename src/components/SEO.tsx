import React from 'react'
import { Helmet } from 'react-helmet'
import { useLocation } from '@reach/router'
import useSiteMetadata from './Hooks/useSiteMetadata'
import favicon from '../images/favicon.png'
import socialImage from '../images/social.jpg'

export default function SEO(
	props: {
		title?: string;
		description?: string;
		image?: string;
		article?: boolean;
	}
) {
	const { pathname } = useLocation()
	const {
		siteName,
		title: defaultTitle,
		description: defaultDescription,
		siteUrl,
		twitterUsername,
	} = useSiteMetadata() ?? {}

	const isRoot = pathname === '/'
	const titleTemplate: string | undefined = !isRoot ? `%s • ${siteName}` : undefined

	const seo = {
		title: props.title ?? defaultTitle,
		description: props.description || defaultDescription,
		image: `${siteUrl}${props.image || socialImage}`,
		url: `${siteUrl}${pathname}`,
	}

	return (
		<Helmet title={seo.title} titleTemplate={titleTemplate} htmlAttributes={{ 'lang': 'en' }}>
			<meta name="description" content={seo.description} />
			<meta name="image" content={seo.image} />
			<link rel="icon" type="image/png" href={favicon} />
			{seo.url && <meta property="og:url" content={seo.url} />}
			{seo.url && <link rel="canonical" href={seo.url} />}
			{props.article && <meta property="og:type" content="article" />}
			{seo.title && <meta property="og:title" content={seo.title} />}
			{seo.description && (
				<meta property="og:description" content={seo.description} />
			)}
			{seo.image && <meta property="og:image" content={seo.image} />}
			<meta name="twitter:card" content="summary_large_image" />
			{twitterUsername && (
				<meta name="twitter:creator" content={twitterUsername} />
			)}
			{seo.title && <meta name="twitter:title" content={seo.title} />}
			{seo.description && (
				<meta name="twitter:description" content={seo.description} />
			)}
			{seo.image && <meta name="twitter:image" content={seo.image} />}
		</Helmet>
	)
}

