import React from 'react'

import { Canvas2D, CanvasImage, Circle, Polygon, Rect } from 'canvas2d-wrapper'
import 'canvas2d-wrapper/dist/index.css'

const App = () => {
	const elements = [];
	for(let i = 0; i < 100; i++) {
		let object = null;
		if(Math.random() > 0.5) {
			object = new Rect(
				i,
				50 - Math.round(Math.random() * 100),
				50 - Math.round(Math.random() * 100),
				1,
				1,
			);
		} else {
			object = new Circle(
				i,
				50 - Math.round(Math.random() * 100),
				50 - Math.round(Math.random() * 100),
				0.5
			);
		}

		if(Math.random() > 0.5) {
			object.fill = 'black';
		}

		if(Math.random() > 0.5) {
			object.stroke = 'black';
		}

		elements.push(object);
	}

	const points = [];
	for(let i = 0; i < 5; i++) {
		points.push({
			x: 50 - Math.round(Math.random() * 100),
			y: 50 - Math.round(Math.random() * 100),
		});
	}

	return (
		<Canvas2D 
			elements={elements}
			width={1200}
			height={700}
			minZoom={0.25}
			maxZoom={4}
			onClick={(e) => {
				console.log('Click event:', e);
			}}
		/>
	);
}

export default App
