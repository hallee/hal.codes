import { css } from 'styled-components'

export const lightTheme = css`
:root {
	--accentBlue: #356dff;
	--accentColor: #ff003e;
	--backgroundColor: #f4f4f4;
	--borderColor: #e0e0e0;
	--contentColor: #4f4f4f;
	--contentColorSecondary: #666666;
	--headingColor: #2d2d2d;
	--linkBackgroundColor: #e8e8e8;
}
@supports (color: color(display-p3 1 1 1)) {
	:root {
		--accentBlue: color(display-p3 0.2078 0.4275 1);
		--accentColor: color(display-p3 1 0 0.2431);
	}
}
`

export const constants = {
	border: '1px solid var(--borderColor)',
	fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	headingFontStack: '"SF Compact Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	mobile: '600px',
	containerWidth: '700px',
	breakOutWidth: '1200px',
	largeBreakpoint: '820px',
}

export const barStyle = css`
	display: grid;
	grid-template-columns: auto 1fr;
	padding: 1em 0;
	margin: 0 auto;
	a, a:visited {
		color: var(--contentColorSecondary);
	}
`

export const fullWidth = css`
	@media (min-width: ${constants.containerWidth}) {
		margin: 0 max(
			calc(-${constants.breakOutWidth} / 2 + ${constants.containerWidth} / 2),
			calc(-100vw / 2 + ${constants.containerWidth} / 2)
		) !important;
	}
	@media (max-width: ${constants.containerWidth}) {
		margin: 0 -1em !important;
	}
`
