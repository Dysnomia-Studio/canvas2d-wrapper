import { useContext, useMemo } from 'react';
import { GameControlsContext } from '../context/GameControlsContextProvider';

export default function useGamepad(): Gamepad | null {
	const contextValues = useContext(GameControlsContext);

	return useMemo(() => contextValues?.gamepad ?? null, [contextValues?.gamepad]);
}