import { useEffect } from 'react'

function resizeGridItem(container: HTMLElement, item: HTMLElement){
	const rowHeight = parseInt(window.getComputedStyle(container).getPropertyValue('grid-auto-rows'))
	const rowGap = parseInt(window.getComputedStyle(container).getPropertyValue('grid-row-gap'))
	const contentHeight = item.children[0]?.getBoundingClientRect()?.height ?? 0
	if (!contentHeight || !rowHeight || !rowGap) {
		item.style.gridRowEnd = 'auto'
		return
	}
	const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap))
	item.style.gridRowEnd = 'span ' + rowSpan
}

function resizeAllGridItems(containerSelector: string, elementSelector: string) {
	const container = document.querySelector<HTMLElement>(containerSelector)
	if (!container) {
		return
	}
	const allItems = document.querySelectorAll<HTMLElement>(elementSelector)
	for (const item of allItems) {
		resizeGridItem(container, item)
	}
}

export default function withMasonryGridLayout(containerSelector: string, elementSelector: string) {
	useEffect(() => {
		function resizeGrid() {
			resizeAllGridItems(containerSelector, elementSelector)
		}
		window.addEventListener('resize', resizeGrid)
		for (const image of document.querySelectorAll('img')) {
			image.addEventListener('load', resizeGrid)
		}
		resizeGrid()
		return () => {
			window.removeEventListener('resize', resizeGrid)
			for (const image of document.querySelectorAll('img')) {
				image.removeEventListener('load', resizeGrid)
			}
		}
	}, [containerSelector, elementSelector])
}
