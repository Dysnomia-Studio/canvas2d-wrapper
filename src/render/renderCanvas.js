import Circle from '../shapes/Circle';
import CanvasImage from '../shapes/CanvasImage';
import Rect from '../shapes/Rect';
import Polygon from '../shapes/Polygon';

import calcTileSize from '../functions/calcTileSize';

import renderCircle from './renderCircle';
import renderImage from './renderImage';
import renderRect from './renderRect';
import renderPolygon from './renderPolygon';

const renderFn = {
	[Circle.prototype.constructor.name]: renderCircle,
	[CanvasImage.prototype.constructor.name]: renderImage,
	[Rect.prototype.constructor.name]: renderRect,
	[Polygon.prototype.constructor.name]: renderPolygon,
};

export default function renderCanvas(
	context,
	width,
	height,
	elements,
	tileSize,
	state,
) {
	const left = state.left;
	const top = state.top;

	let prevFillStyle = '';
	let prevStrokeStyle = '';

	const localTileSize = calcTileSize(tileSize, state.zoom);

	context.clearRect(0, 0, width, height);

	for(const element of elements) {
		if(
			element.fill !== prevFillStyle &&
			typeof element.fill !== 'undefined'
		) {
			context.fillStyle = element.fill;
			prevFillStyle = element.fill;
		}

		if(
			element.stroke !== prevStrokeStyle &&
			typeof element.stroke !== 'undefined'
		) {
			context.strokeStyle = element.stroke;
			prevStrokeStyle = element.stroke;
		}

		const type = element.constructor.name;
		if(renderFn[type]) {
			renderFn[type](context, element, left, top, localTileSize);
		} else {
			throw new Error('Unsupported shape type:' + type);
		}
	}
}
