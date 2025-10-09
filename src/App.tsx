import React from 'react';
import generateTestData from '../lib/generateTestData.ts';
import '../lib/index.css';
import { Canvas2D } from '../lib/main.ts';
import './index.css';

const elements = generateTestData();

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
