import calcTileSize from '../functions/calcTileSize';
import CanvasImage from '../shapes/CanvasImage';
import CanvasObject from '../shapes/CanvasObject';
import Circle from '../shapes/Circle';
import LinePath from '../shapes/LinePath';
import Polygon from '../shapes/Polygon';
import Rect from '../shapes/Rect';
import Canvas2DState from '../types/Canvas2DState';
import renderCircle from './renderCircle';
import renderImage from './renderImage';
import renderLinePath from './renderLinePath';
import renderPolygon from './renderPolygon';
import renderRect from './renderRect';

const renderFn = {
	[(new Circle({ id: 'a', x: 0, y: 0, radius: 0 })).constructorName]: renderCircle,
	[(new CanvasImage({ id: 'a', x: 0, y: 0, src: '', width: 0, height: 0 })).constructorName]: renderImage,
	[(new LinePath({ id: 'a', points: [{ x: 0, y: 0 }], lineWidth: 0, stroke: '' })).constructorName]: renderLinePath,
	[(new Polygon({ id: 'a', points: [{ x: 0, y: 0 }] })).constructorName]: renderPolygon,
	[(new Rect({ id: 'a', x: 0, y: 0, width: 0, height: 0 })).constructorName]: renderRect,
};

export default function renderCanvas(
	context: CanvasRenderingContext2D,
	width: number,
	height: number,
	elements: CanvasObject[],
	tileSize: number,
	state: Canvas2DState,
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
			renderFn[type](context, element as Circle & CanvasImage & LinePath & Rect, left, top, localTileSize);
		} else {
			throw new Error('Unsupported shape type:' + type);
		}
	}
}
