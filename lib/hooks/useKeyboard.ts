import { useContext, useMemo } from 'react';
import { GameControlsContext } from '../context/GameControlsContextProvider';
import KeyboardEntries from '../types/KeyboardEntries';

export default function useKeyboard(): KeyboardEntries {
	const contextValues = useContext(GameControlsContext);

	return useMemo(() => contextValues?.keyboard ?? {}, [contextValues?.keyboard]);
}