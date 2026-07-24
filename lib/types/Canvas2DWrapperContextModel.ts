import Canvas2DState from "./Canvas2DState";
import Position2D from "./Position2D";

type Canvas2DWrapperContextModel = {
	getCurrentOffset: (canvasId: string) => Position2D,
	updateOffset: (canvasId: string, offset: Position2D) => void,
	canvasState: { [id: string]: Canvas2DState },
	setCanvasState: React.Dispatch<React.SetStateAction<{ [id: string]: Canvas2DState }>>
};

export default Canvas2DWrapperContextModel;
