import React, { createContext, useCallback, useMemo, useState } from "react";
import Canvas2DState from "../types/Canvas2DState";
import Canvas2DWrapperContextModel from "../types/Canvas2DWrapperContextModel";
import Position2D from "../types/Position2D";

export const Canvas2DWrapperContext = createContext<Canvas2DWrapperContextModel | null>(null);

export default function Canvas2DWrapperContextProvider({ children }: { children: React.ReactNode }) {
	const [canvasState, setCanvasState] = useState<{ [id: string]: Canvas2DState }>({});

	const getCurrentOffset = useCallback((canvasId: string) => ({
		x: canvasState[canvasId].left ?? 0,
		y: canvasState[canvasId].top ?? 0,
	}), [canvasState]);
	const updateOffset = useCallback((canvasId: string, offset: Position2D) => {
		console.log(canvasId, offset)
		setCanvasState((co) => {
			if (!co[canvasId]) {
				return co;
			}
			co[canvasId].left = offset.x;
			co[canvasId].top = offset.y;
			return co;
		});
	}, [setCanvasState]);

	const providerValue = useMemo(() => ({
		getCurrentOffset,
		updateOffset,
		canvasState,
		setCanvasState
	}), [
		getCurrentOffset,
		updateOffset,
		canvasState,
		setCanvasState
	]);

	return (
		<Canvas2DWrapperContext.Provider value={providerValue}>
			{children}
		</Canvas2DWrapperContext.Provider>
	);
}
