declare module '*.css'
declare module '*.jpg'
declare module '*.png'

declare module 'csstype' {
	import * as CSS from 'csstype'
	interface Properties extends CSS.Properties {
		'--project-background-color'?: string;
		'--project-background-color-p3'?: string;
	}
}
