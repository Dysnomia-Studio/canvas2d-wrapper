import React from 'react';
import './index.css';

/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */

import '../lib/index.css';
import { Canvas2D, CanvasObject, Circle, Polygon, Rect } from '../lib/main.ts';

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
			draggable: true,
			hasCollisions: true
		});
	} else {
		object = new Circle({
			id: i.toString(),
			x: 500 - Math.round(Math.random() * 1000),
			y: 500 - Math.round(Math.random() * 1000),
			radius: 16,
			fill: (Math.random() > 0.5) ? 'black' : undefined,
			stroke: (Math.random() > 0.5) ? 'black' : undefined,
			hasCollisions: true
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


const App = () => {
	return (
		<Canvas2D
			id="MyCanvas"
			width={1200}
			height={700}
			minZoom={0.25}
			maxZoom={4}
			tileSize={1}
			deltaLeft={100}
			deltaTop={100}
			onClick={(e) => {
				console.log('Click event:', e);
			}}
			onRightClick={(e) => {
				console.log('Right click event:', e);
			}}
			onHover={(e) => {
				console.log('Hover event:', e);
			}}
			onElementMoved={(elt, x, y) => {
				console.log('Moved element:', elt, x, y);
			}}
			onWheel={(e) => {
				console.log('Wheel event:', e);
			}}
			onFrame={(e) => {
				return elements;
			}}
			dragObjects={true}
		/>
	);
};

export default App;
