import React from 'react'

import { Canvas2D } from 'canvas2d-wrapper'
import 'canvas2d-wrapper/dist/index.css'

const App = () => {
	const elements = [];
	for(let i = 0; i < 100; i++) {
		elements.push({
			id: i,
			type: 'rect',
			x: 50 - Math.round(Math.random() * 100),
			y: 50 - Math.round(Math.random() * 100),
			width: 1,
			height: 1,
			fill: (Math.random() > 0.5 ? 'black': undefined),
			stroke: (Math.random() > 0.5 ? 'black': undefined),
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
