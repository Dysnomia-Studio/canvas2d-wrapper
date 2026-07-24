import { useContext } from "react";
import { Canvas2DWrapperContext } from "../context/Canvas2DWrapperContextProvider";
import Canvas2DState from "../types/Canvas2DState";
import { Canvas2DStateSetState } from "../types/Canvas2DStateSetState";

export default function useCanvasStateSetter(canvasId: string): Canvas2DStateSetState {
	const contextData = useContext(Canvas2DWrapperContext);
	return (cb: (oldValue: Canvas2DState) => Canvas2DState) => {
		if (!contextData?.setCanvasState) {
			return;
		}
		contextData?.setCanvasState((oldValue) => ({
			...oldValue,
			[canvasId]: cb(oldValue[canvasId] ?? {}),
		}));
	};
}