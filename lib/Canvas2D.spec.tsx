import { screen } from '@testing-library/dom';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import './index.css';
import { Canvas2D, CanvasObject, Circle, Polygon, Rect } from './main.ts';

/* eslint-disable no-console */
/* eslint-disable no-magic-numbers */

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

test('Renders Canvas2D without problem with default values', async () => {
	render(
		<Canvas2D
			data-testid="custom-element"
			id="MyCanvas"
			onFrame={() => elements}
			onClick={console.log}
			width={1200}
			height={700}
		/>
	);

	await new Promise((r) => setTimeout(r, 2000)); // Wait for some time to be sure it won't crash

	waitFor(() => expect(screen.getByTestId('custom-element')).toBeTruthy(), { interval: 200 });
});

test('Renders Canvas2D without problem with custom values', async () => {
	render(
		<Canvas2D
			data-testid="custom-element"
			id="MyCanvas"
			width={1200}
			height={700}
			minZoom={0.25}
			maxZoom={4}
			tileSize={32}
			deltaLeft={100}
			deltaTop={100}
			trackMouseMove={false}
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
			onFrame={() => {
				console.log('Frame');
				return elements;
			}}
			dragObjects={true}
		/>
	);

	await new Promise((r) => setTimeout(r, 2000)); // Wait for some time to be sure it won't crash

	waitFor(() => expect(screen.getByTestId('custom-element')).toBeTruthy(), { interval: 200 });
});

test('Canvas2D throws with invalid zoom values', async () => {
	expect(() => render(
		<Canvas2D
			id="MyCanvas"
			onFrame={() => elements}
			onClick={console.log}
			width={1200}
			height={700}
			minZoom={2}
			maxZoom={1}
		/>
	)).toThrow('minZoom should be lower than maxZoom.');
});
