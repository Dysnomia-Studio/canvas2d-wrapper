import { useEffect, useState } from 'react';

let intervalId = 0;
const FRAME_INTERVAL = 15; // TODO: requestAnimationFrame ?
export default function useGamepad() {
	const [gamepad, setGamepad] = useState();

	useEffect(() => {
		clearInterval(intervalId);
		intervalId = setInterval(() =>
			setGamepad(navigator.getGamepads()[0])
		, FRAME_INTERVAL);
	}, []);

	return gamepad;
}