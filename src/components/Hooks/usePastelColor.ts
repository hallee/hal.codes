function hslToRGB(h: number, s: number, l: number) {
	let r, g, b: number
	if(s == 0) {
		r = g = b = l // achromatic
	} else {
		const hue2rgb = function hue2rgb(p: number, q: number, t: number) {
			if (t < 0) t += 1
			if (t > 1) t -= 1
			if (t < 1/6) return p + (q - p) * 6 * t
			if (t < 1/2) return q
			if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
			return p
		}
		const q = l < 0.5 ? l * (1 + s) : l + s - l * s
		const p = 2 * l - q
		r = hue2rgb(p, q, h + 1/3)
		g = hue2rgb(p, q, h)
		b = hue2rgb(p, q, h - 1/3)
	}
	return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)]
}

/** Generates a random pastel color in the form of a Display P3 compatible CSS color string */
export default function usePastelColor(seed?: string) {
	const hue = (seed ? Array.from(seed).reduce((acc, char, i) => {
		// generate hash from 0—1 from input string
		return (acc + ((i + 1) * (char.codePointAt(0) ?? 0) / (1 << 7))) % 1
	}, 0) : Math.random())
	const [ r, g, b ] = hslToRGB(hue, 0.5, 0.8)
	return {
		sRGB: `rgb(${r}, ${g}, ${b}, 0.5)`,
		p3: `color(display-p3 ${r/255} ${g/255} ${b/255} / 0.5)`,
	}
}
