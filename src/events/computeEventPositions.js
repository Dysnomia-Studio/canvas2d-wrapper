export default function computeEventPositions(props, event, tileSize) {
	const left = -props.left - props.deltaLeft + event.pageX - event.target.offsetLeft;
	const top = -props.top - props.deltaTop + event.pageY - event.target.offsetTop;
	const posOnMap = { x: Math.floor(left / tileSize / props.zoom), y: Math.floor(top / tileSize / props.zoom) };

	return { left, top, posOnMap };
}