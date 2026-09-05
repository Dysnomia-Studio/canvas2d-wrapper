import { useContext } from "react";
import { Canvas2DWrapperContext } from "../context/Canvas2DWrapperContextProvider";

export default function useCanvasOffsetSetter(id: string) {
	const contextData = useContext(Canvas2DWrapperContext);
	return (newValue: number) => contextData!.updateZoom(id, newValue);
}