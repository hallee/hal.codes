import { css } from 'styled-components'

export const theme = {
	background: '#F4F4F4',
	accent: '#356DFF',
	accentLight: '#6B94FF',
	contentColor: '#4f4f4f',
	contentColorSecondary: '#828282',
	headingColor: '#2d2d2d',
	border: '1px solid #e0e0e0',
	linkBackground: '#e8e8e8',
	linkBackgroundHover: '#d9d9d9',
	fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	headingFontStack: '"SF Compact Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	containerWidth: '700px',
	breakOutWidth: '1200px',
	largeBreakpoint: '820px',
}

export const darkTheme = {
	...theme,
	background: '#000000'
}

export const barStyle = css`
	display: grid;
	grid-template-columns: auto 1fr;
	padding: 0.5em 0;
	margin: 0 auto;
	a, a:visited {
		color: ${theme.contentColorSecondary};
	}
`

export const fullWidth = css`
	@media (min-width: ${theme.containerWidth}) {
		margin: 0 max(
			calc(-${theme.breakOutWidth} / 2 + ${theme.containerWidth} / 2),
			calc(-100vw / 2 + ${theme.containerWidth} / 2)
		) !important;
	}
	@media (max-width: ${theme.containerWidth}) {
		margin: 0 -1em !important;
	}
`
