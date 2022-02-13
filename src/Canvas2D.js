import React, { useCallback, useState } from 'react';

import './index.css';

import elementClick from './events/elementClick';
import mouseMove from './events/mouseMove';
import mouseWheel from './events/mouseWheel';

import sortElements from './functions/sortElements';

import renderCanvas from './render/renderCanvas';

export default function Canvas2D({
	elements,
	width,
	height,
	trackMouseMove = true,
	minZoom = 1,
	maxZoom = 1,
	tileSize = 1,
	onClick,
	onHover,
	onElementMoved,
	lockXAxis = false,
	lockYAxis = false,
	smoothingQuality='medium',
	dragObjects=false,
	deltaLeft=0,
	deltaTop=0,
	...otherProps
}) {
	// Hooks
	const [state, setState] = useState({});
	const canvasRef = useCallback((canvas) => {
		if(canvas !== null) {
			const context = canvas.getContext('2d');

			if(smoothingQuality === false) {
				context.imageSmoothingEnabled = false;
			} else {
				context.imageSmoothingEnabled = true;
				context.imageSmoothingQuality = smoothingQuality;
			}

			setState({
				boundingClientRect: canvas.getBoundingClientRect(),
				context,
				left: width/2,
				top: height/2,
				width,
				height,
				zoom: 1,
			});
		}
	}, []);

	state.deltaTop = deltaTop;
	state.deltaLeft = deltaLeft;

	// Check inputs
	if(typeof elements !== 'object' || !Array.isArray(elements)) {
		throw new Error('Invalid elements, should be an array !');
	}

	if(typeof width !== 'number' || typeof height !== 'number') {
		throw new Error('width/height should be specified and be numbers.');
	}

	if(minZoom > maxZoom) {
		throw new Error('minZoom should be lower than maxZoom.');
	}

	if(typeof onClick !== 'function' && typeof onClick !== 'undefined') {
		throw new Error('onClick should be a function.');
	}

	// Sort elements
	const sortedElements = sortElements(elements);

	// Render
	let onMouseMove = null;
	if(trackMouseMove) {
		onMouseMove = (e) => mouseMove(e, elements, tileSize, state, setState, lockXAxis, lockYAxis, dragObjects, onElementMoved, onHover);
	}

	let onWheel = null;
	if(minZoom !== maxZoom) {
		onWheel = (e) => mouseWheel(e, state, setState, minZoom, maxZoom);
	}

	let onClickFn = null;
	if(onClick) {
		onClickFn = (e) => onClick(elementClick(e, elements, tileSize, state));
	}

	// Canvas render loop
	if(state.context) {
		window.requestAnimationFrame(() => {
			renderCanvas(
				state.context,
				width,
				height,
				sortedElements,
				tileSize,
				state,
			);
		});
	}

	return (
		<canvas
			ref={canvasRef}
			width={width}
			height={height}
			onMouseMove={onMouseMove}
			onWheel={onWheel}
			onClick={onClickFn}
			className="canvas2d-wrapper"
			{...otherProps}
		/>
	);
};
