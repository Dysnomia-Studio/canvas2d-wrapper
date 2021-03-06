import React, { useCallback, useState } from 'react';

import './index.css';

import elementClick from './events/elementClick';
import elementRightClick from './events/elementRightClick';
import mouseMove from './events/mouseMove';
import mouseWheel from './events/mouseWheel';

import sortElements from './functions/sortElements';

import renderCanvas from './render/renderCanvas';

let prevEvent;

export default function Canvas2D({
	elements,
	width,
	height,
	trackMouseMove = true,
	minZoom = 1,
	maxZoom = 1,
	tileSize = 1,
	onClick,
	onRightClick,
	onHover,
	onElementMoved,
	onWheel,
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
				canvas,
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

	const onWheelFn = (e) => {
		if(onWheel) {
			onWheel(e);
		}

		if(minZoom !== maxZoom) {
			mouseWheel(e, state, setState, minZoom, maxZoom);
		}
	};

	let onClickFn = null;
	if(onClick) {
		onClickFn = (e) => onClick(elementClick(e, elements, tileSize, state));
	}

	if(onRightClick && state.canvas) {
		if(prevEvent) {
			state.canvas.removeEventListener('contextmenu', prevEvent);
		}
		prevEvent = (e) => {
			e.preventDefault();
			onRightClick(elementRightClick(e, elements, tileSize, state));
		};
		state.canvas.addEventListener('contextmenu', prevEvent);
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
			onPointerMove={onMouseMove}
			onWheel={onWheelFn}
			onClick={onClickFn}
			className="canvas2d-wrapper"
			{...otherProps}
		/>
	);
}
