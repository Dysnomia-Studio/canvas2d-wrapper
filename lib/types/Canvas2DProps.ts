import CanvasObject from "../shapes/CanvasObject";
import CollideElementResultItem from "./CollideElementResultItem";
import Position2D from "./Position2D";

export type Canvas2DProps = {
	width: number,
	height: number,
	trackMouseMove?: boolean,
	minZoom?: number,
	maxZoom?: number,
	tileSize?: number,
	onClick?: (collideRes: CollideElementResultItem) => void,
	onRightClick?: (collideRes: CollideElementResultItem) => void,
	onHover?: (collideRes: CollideElementResultItem | null, position?: Position2D) => void,
	onElementMoved?: (collideRes: CollideElementResultItem, x: number, y: number) => void,
	onWheel?: (e: Event) => void,
	onFrame: () => CanvasObject[],
	lockXAxis?: boolean,
	lockYAxis?: boolean,
	smoothingQuality?: ImageSmoothingQuality,
	dragObjects?: boolean,
	deltaLeft?: number,
	deltaTop?: number,
	// Additional props
	id: string,
	className?: string,
	showMinimap?: boolean,
	minimapWidth?: number,
	minimapHeight?: number,
	minimapFilter?: (e: CanvasObject) => boolean,
};

export default Canvas2DProps;
