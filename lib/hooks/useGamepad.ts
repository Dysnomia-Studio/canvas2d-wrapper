import { useEffect, useState } from 'react';

let intervalId: NodeJS.Timeout;
const FRAME_INTERVAL = 15; // TODO: requestAnimationFrame ?
export default function useGamepad(): Gamepad | null {
	const [gamepad, setGamepad] = useState<Gamepad | null>(null);

	useEffect(() => {
		clearInterval(intervalId);
		intervalId = setInterval(() =>
			setGamepad(navigator.getGamepads()[0])
			, FRAME_INTERVAL);

		return () => clearInterval(intervalId);
	}, []);

	return gamepad;
}