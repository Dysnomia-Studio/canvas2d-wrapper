import { useContext } from "react";
import { Canvas2DWrapperContext } from "../context/Canvas2DWrapperContextProvider";

export default function useCanvasOffset(id: string) {
	const contextData = useContext(Canvas2DWrapperContext);
	return contextData!.getCurrentOffset(id);
}