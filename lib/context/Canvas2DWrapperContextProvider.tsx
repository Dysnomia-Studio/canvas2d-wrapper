import React, { createContext, useCallback, useMemo, useState } from "react";
import Canvas2DState from "../types/Canvas2DState";
import Canvas2DWrapperContextModel from "../types/Canvas2DWrapperContextModel";
import Position2D from "../types/Position2D";

export const Canvas2DWrapperContext = createContext<Canvas2DWrapperContextModel | null>(null);
type CanvasState = { [id: string]: Canvas2DState };

export default function Canvas2DWrapperContextProvider({ children }: { children: React.ReactNode }) {
	const [canvasState, setCanvasState] = useState<CanvasState>({});

	const getCurrentOffset = useCallback((canvasId: string) => ({
		x: canvasState[canvasId]?.left ?? 0,
		y: canvasState[canvasId]?.top ?? 0,
	}), [canvasState]);
	const updateOffset = useCallback((canvasId: string, offset: Position2D) => {
		setCanvasState((co: CanvasState) => {
			if (!co[canvasId]) {
				return co;
			}
			co[canvasId].left = offset.x;
			co[canvasId].top = offset.y;
			return co;
		});
	}, [setCanvasState]);

	const getZoom = useCallback((canvasId: string) => canvasState[canvasId]?.zoom ?? 0, [canvasState]);
	const updateZoom = useCallback((canvasId: string, zoom: number) => {
		setCanvasState((co: CanvasState) => {
			if (!co[canvasId]) {
				return co;
			}
			co[canvasId].zoom = zoom;
			
			return co;
		});
	}, [setCanvasState]);

	const providerValue = useMemo(() => ({
		getCurrentOffset,
		updateOffset,
		getZoom,
		updateZoom,
		canvasState,
		setCanvasState
	}), [
		getCurrentOffset,
		updateOffset,
		getZoom,
		updateZoom,
		canvasState,
		setCanvasState
	]);

	return (
		<Canvas2DWrapperContext.Provider value={providerValue}>
			{children}
		</Canvas2DWrapperContext.Provider>
	);
}
