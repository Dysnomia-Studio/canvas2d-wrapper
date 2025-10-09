import { screen } from '@testing-library/dom';
import { render, waitFor } from '@testing-library/react';
import React from 'react';
import generateTestData from './generateTestData.ts';
import './index.css';
import { Canvas2D } from './main.ts';

const elements = generateTestData();

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
