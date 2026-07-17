import { useEffect, useState } from 'react';

function getWindowDimensions(): {
	width: number,
	height: number,
} {
	const { clientWidth: width, clientHeight: height } = document.documentElement;
	return {
		width,
		height,
	};
}

export default function useWindowDimensions() {
	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		function handleResize() {
			setWindowDimensions(getWindowDimensions());
		}

		globalThis.addEventListener('resize', handleResize);
		return () => globalThis.removeEventListener('resize', handleResize);
	}, []);

	return windowDimensions;
}
