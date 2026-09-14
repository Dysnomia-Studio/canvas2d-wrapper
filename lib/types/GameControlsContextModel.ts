import KeyboardEntries from "./KeyboardEntries";

type GameControlsContextModel = {
	gamepad: Gamepad | null,
	keyboard: KeyboardEntries,
};

export default GameControlsContextModel;
