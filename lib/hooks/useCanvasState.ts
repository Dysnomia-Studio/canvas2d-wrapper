import { useContext } from "react";
import { Canvas2DWrapperContext } from "../context/Canvas2DWrapperContextProvider";

export default function useCanvasState(id: string) {
	const contextData = useContext(Canvas2DWrapperContext);
	return (contextData?.canvasState ?? {})[id] ?? {
		width: 0,
		height: 0,
		zoom: 0,
		left: 0,
		top: 0,
		prevX: null,
		prevY: null,
	};
}