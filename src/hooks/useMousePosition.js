import { useEffect, useState } from 'react';

export default function useMousePosition(includeTouch = true) {
	const [
		mousePosition,
		setMousePosition
	] = useState({ x: null, y: null });

	useEffect(() => {
		const updateMousePosition = ev => {
			let x, y;
			if (ev.touches) {
				const touch = ev.touches[0];
				[x, y] = [touch.clientX, touch.clientY];
			} else {
				[x, y] = [ev.clientX, ev.clientY];
			}
			setMousePosition({ x, y });
		};
		window.addEventListener('mousemove', updateMousePosition);

		if (includeTouch) {
			window.addEventListener('touchmove', updateMousePosition);
		}

		return () => {
			window.removeEventListener('mousemove', updateMousePosition);

			if (includeTouch) {
				window.removeEventListener('touchmove', updateMousePosition);
			}
		};
	}, [includeTouch]);

	return mousePosition;
}