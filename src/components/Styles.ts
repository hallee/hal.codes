import { css } from 'styled-components'

export const lightTheme = css`
	:root {
		--accentColor: #ff003e;
		--accentColorFaint: #ff003e07;
		--backgroundColor: #f4f4f4;
		--borderColor: #e0e0e0;
		--cardBackgroundColor: #e3e3e3;
		--contentColor: #2f2f2f;
		--contentColorSecondary: #666666;
		--headingColor: #2d2d2d;
		--linkBackgroundColor: #e8e8e8;
	}
	@supports (color: color(display-p3 1 1 1)) {
		:root {
			--accentColor: color(display-p3 1 0 0.2431);
			--accentColorFaint: color(display-p3 1 0 0.2431 / 0.07);
		}
	}
`

export const constants = {
	border: '1px solid var(--borderColor)',
	borderRadius: '0.5rem',
	fontStack: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	headingFontStack: '"BasierSquare", "SF Compact Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
	monoFontStack: '"Iosevka", "SF Mono", Monaco, monospace',

	mobile: '600px',
	containerWidth: '700px',
	breakOutWidth: '1200px',
	largeBreakpoint: '820px',
}

export const popAnimation = css`
	transition: color 0.2s cubic-bezier(0.1, 0.5, 0.8, 1.1),
	background-color 0.2s cubic-bezier(0.1, 0.5, 0.8, 1.1),
	transform 0.3s cubic-bezier(0.175, 0.9, 0.32, 1.6);
	&:hover {
		transform: scale(1.03);
	}
	&:active {
		transform: scale(1);
	}
`
export const barStyle = css`
	display: grid;
	grid-template-columns: auto 1fr;
	justify-content: space-between;
	padding: 1em 0;
	margin: 0 auto;
	a, a:visited {
		color: var(--contentColorSecondary);
	}
`

const breakOut = css`
max(
	calc(-${constants.breakOutWidth} / 2 + ${constants.containerWidth} / 2),
	calc(-100vw / 2 + ${constants.containerWidth} / 2)
)
`

export const fullWidth = css`
	@media (min-width: ${constants.containerWidth}) {
		max-width: min(${constants.breakOutWidth}, 100vw);
		margin-left: ${breakOut};
		margin-right: ${breakOut};
	}
	@media (max-width: ${constants.containerWidth}) {
		max-width: calc(100% + 2em);
		margin-left: -1em;
		margin-right: -1em;
	}
`
