import { useContext } from "react";
import { Canvas2DWrapperContext } from "../context/Canvas2DWrapperContextProvider";
import Position2D from "../types/Position2D";

export default function useCanvasOffsetSetter(id: string) {
	const contextData = useContext(Canvas2DWrapperContext);
	return (newValue: Position2D) => contextData!.updateOffset(id, newValue);
}