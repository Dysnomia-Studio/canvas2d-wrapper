import React, { createContext, useEffect, useMemo, useState } from "react";
import GameControlsContextModel from "../types/GameControlsContextModel";
import KeyboardEntries from "../types/KeyboardEntries";

export const GameControlsContext = createContext<GameControlsContextModel | null>(null);

function useGamepadValues(setGamepad: React.Dispatch<React.SetStateAction<Gamepad | null>>) {
	const [gamepadEnabled, setGamepadEnabled] = useState(false);

	useEffect(() => {
		setGamepadEnabled(navigator.getGamepads()[0] !== null);
	}, []);

	useEffect(() => {
		function updateGamepadEnabledEvent() {
			setGamepadEnabled(navigator.getGamepads()[0] !== null);
		}

		window.addEventListener("gamepadconnected", updateGamepadEnabledEvent);
		window.addEventListener("gamepaddisconnected", updateGamepadEnabledEvent);

		return () => {
			window.removeEventListener("gamepadconnected", updateGamepadEnabledEvent);
			window.removeEventListener("gamepaddisconnected", updateGamepadEnabledEvent);
		}
	}, []);

	useEffect(() => {
		if (!gamepadEnabled) {
			return;
		}

		let cancelled = false;

		function updateGamepadValues() {
			if (cancelled) {
				return;
			}

			setGamepad(navigator.getGamepads()[0]);

			window.requestAnimationFrame(updateGamepadValues);
		}

		window.requestAnimationFrame(updateGamepadValues);

		return () => {
			cancelled = true;
		};
	}, [gamepadEnabled]);

}

function useKeyboardValues(keyboard: KeyboardEntries, setKeyboard: React.Dispatch<React.SetStateAction<KeyboardEntries>>) {
	useEffect(() => {
		const keydown = (e: KeyboardEvent) => {
			keyboard[e.key] = true;
			setKeyboard(JSON.parse(JSON.stringify(keyboard)));
		};
		document.addEventListener('keydown', keydown);

		const keyup = (e: KeyboardEvent) => {
			keyboard[e.key] = false;
			setKeyboard(JSON.parse(JSON.stringify(keyboard)));
		};
		document.addEventListener('keyup', keyup);


		return () => {
			document.removeEventListener('keydown', keydown);
			document.removeEventListener('keyup', keyup);
		};
	}, []);
}

export default function GameControlsContextProvider({ children }: { children: React.ReactNode }) {
	const [gamepad, setGamepad] = useState<Gamepad | null>(null);
	useGamepadValues(setGamepad);

	const [keyboard, setKeyboard] = useState<KeyboardEntries>({});
	useKeyboardValues(keyboard, setKeyboard);

	const providerValue = useMemo(() => ({
		gamepad,
		keyboard
	}), [
		gamepad,
		keyboard
	]);

	return (
		<GameControlsContext.Provider value={providerValue}>
			{children}
		</GameControlsContext.Provider>
	);
}
