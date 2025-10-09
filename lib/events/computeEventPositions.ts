import Canvas2DState from "../types/Canvas2DState";

export default function computeEventPositions(props: Canvas2DState, event: React.MouseEvent, tileSize: number) {
	const left = -props.left - props.deltaLeft + event.pageX - (event.target as HTMLElement).offsetLeft;
	const top = -props.top - props.deltaTop + event.pageY - (event.target as HTMLElement).offsetTop;
	const posOnMap = { x: Math.floor(left / tileSize / props.zoom), y: Math.floor(top / tileSize / props.zoom) };

	return { left, top, posOnMap };
}