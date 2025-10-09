import CanvasObject from "./shapes/CanvasObject";
import Circle from "./shapes/Circle";
import Polygon from "./shapes/Polygon";
import Rect from "./shapes/Rect";

/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */
export default function generateTestData() {
	const elements: CanvasObject[] = [];
	for (let i = 0; i < 998; i++) {
		let object = null;
		if (Math.random() > 0.5) {
			object = new Rect({
				id: i.toString(),
				x: 500 - Math.round(Math.random() * 1000),
				y: 500 - Math.round(Math.random() * 1000),
				width: 32,
				height: 32,
				fill: (Math.random() > 0.5) ? 'black' : undefined,
				stroke: (Math.random() > 0.5) ? 'black' : undefined,
				draggable: true
			});
		} else {
			object = new Circle({
				id: i.toString(),
				x: 500 - Math.round(Math.random() * 1000),
				y: 500 - Math.round(Math.random() * 1000),
				radius: 16,
				fill: (Math.random() > 0.5) ? 'black' : undefined,
				stroke: (Math.random() > 0.5) ? 'black' : undefined
			});
		}

		if (!object.fill && !object.stroke) {
			object.fill = 'green';
		}

		elements.push(object);
	}

	const points = [];
	for (let i = 0; i < 5; i++) {
		points.push({
			x: 500 - Math.round(Math.random() * 1000),
			y: 500 - Math.round(Math.random() * 1000),
		});
	}

	const polygon = new Polygon({
		id: 'poly',
		points,
		stroke: 'red',
	});
	elements.push(polygon);

	const polygon2 = new Polygon({
		id: 'poly',
		points,
		fill: 'orange',
		zIndex: -1,
	});
	elements.push(polygon2);

	return elements;
}
