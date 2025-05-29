import CanvasImage from '../shapes/CanvasImage';
import Circle from '../shapes/Circle';
import LinePath from '../shapes/LinePath';
import Polygon from '../shapes/Polygon';
import Rect from '../shapes/Rect';

import calcTileSize from '../functions/calcTileSize';

import renderCircle from './renderCircle';
import renderImage from './renderImage';
import renderLinePath from './renderLinePath';
import renderPolygon from './renderPolygon';
import renderRect from './renderRect';

const renderFn = {
	[(new Circle({})).constructorName]: renderCircle,
	[(new CanvasImage({})).constructorName]: renderImage,
	[(new Rect({})).constructorName]: renderRect,
	[(new Polygon({ points: [{}] })).constructorName]: renderPolygon,
	[(new LinePath({ points: [{}] })).constructorName]: renderLinePath,
};

export default function renderCanvas(
	context,
	width,
	height,
	elements,
	tileSize,
	state,
) {
	const left = state.left + state.deltaLeft;
	const top = state.top + state.deltaTop;

	let prevFillStyle = '';
	let prevStrokeStyle = '';

	const localTileSize = calcTileSize(tileSize, state.zoom);

	context.clearRect(0, 0, width, height);

	for (const element of elements) {
		if (
			element.fill !== prevFillStyle &&
			typeof element.fill !== 'undefined'
		) {
			context.fillStyle = element.fill;
			prevFillStyle = element.fill;
		}

		if (
			element.stroke !== prevStrokeStyle &&
			typeof element.stroke !== 'undefined'
		) {
			context.strokeStyle = element.stroke;
			prevStrokeStyle = element.stroke;
		}

		const type = element.constructorName;
		if (renderFn[type]) {
			renderFn[type](context, element, left, top, localTileSize);
		} else {
			throw new Error('Unsupported shape type:' + type);
		}
	}
}
