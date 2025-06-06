import React, { useCallback, useEffect, useState } from 'react';

import './index.css';

import elementClick from './events/elementClick';
import elementRightClick from './events/elementRightClick';
import mouseMove from './events/mouseMove';
import mouseWheel from './events/mouseWheel';

import calcRatioForMinimap from './functions/calcRatioForMinimap';
import sortElements from './functions/sortElements';

import renderCanvas from './render/renderCanvas';

const elements = {};

export default function Canvas2D({
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
	onFrame,
	lockXAxis = false,
	lockYAxis = false,
	smoothingQuality = 'medium',
	dragObjects = false,
	deltaLeft = 0,
	deltaTop = 0,
	showMinimap = false,
	minimapWidth = 240,
	minimapHeight = 120,
	minimapFilter = (e) => true,
	...otherProps
}) {
	if (!elements[otherProps.id]) {
		elements[otherProps.id] = [];
	}

	// Hooks
	const [state, setState] = useState({});
	const canvasRef = useCallback((canvas) => {
		if (canvas !== null) {
			const context = canvas.getContext('2d');

			if (smoothingQuality === false) {
				context.imageSmoothingEnabled = false;
			} else {
				context.imageSmoothingEnabled = true;
				context.imageSmoothingQuality = smoothingQuality;
			}

			setState((s) => ({
				...s,
				boundingClientRect: canvas.getBoundingClientRect(),
				canvas,
				context,
				left: width / 2,
				top: height / 2,
				width,
				height,
				zoom: 1,
			}));
		}
	}, []);

	const canvasMapRef = useCallback((minimapCanvas) => {
		if (minimapCanvas !== null) {
			const minimapContext = minimapCanvas.getContext('2d');

			setState((s) => ({
				...s,
				boundingClientRect: minimapCanvas.getBoundingClientRect(),
				minimapCanvas,
				minimapContext,
			}));
		}
	}, []);

	state.deltaTop = deltaTop;
	state.deltaLeft = deltaLeft;

	// Check inputs
	if (typeof width !== 'number' || typeof height !== 'number') {
		throw new Error('width/height should be specified and be numbers.');
	}

	if (minZoom > maxZoom) {
		throw new Error('minZoom should be lower than maxZoom.');
	}

	if (typeof onClick !== 'function' && typeof onClick !== 'undefined') {
		throw new Error('onClick should be a function.');
	}

	if (typeof onFrame !== 'function') {
		throw new Error('onFrame should be a function.');
	}

	// Render
	let onMouseMove = null;
	if (trackMouseMove) {
		onMouseMove = (e) => mouseMove(e, elements[otherProps.id], tileSize, state, setState, lockXAxis, lockYAxis, dragObjects, onElementMoved, onHover);
	}

	const onWheelFn = (e) => {
		if (onWheel) {
			onWheel(e);
		}

		if (minZoom !== maxZoom) {
			mouseWheel(e, state, setState, minZoom, maxZoom);
		}
	};

	let onClickFn = null;
	if (onClick) {
		onClickFn = (e) => onClick(elementClick(e, elements[otherProps.id], tileSize, state));
	}


	// Right click Event
	useEffect(() => {
		function onRightClickEvent(e) {
			e.preventDefault();
			onRightClick(elementRightClick(e, elements[otherProps.id], tileSize, state));
		}

		if (onRightClick && state.canvas) {
			state.canvas.addEventListener('contextmenu', onRightClickEvent);
			return () => { state.canvas.removeEventListener('contextmenu', onRightClickEvent); };
		}
	}, [state.canvas, onRightClick]);

	// Canvas render loop
	useEffect(() => {
		let shouldRender = true;
		function render() {
			if (!shouldRender) {
				return;
			}

			elements[otherProps.id] = onFrame();
			const sortedElements = sortElements(elements[otherProps.id]);

			if (state.context) {
				renderCanvas(
					state.context,
					width,
					height,
					sortedElements,
					tileSize,
					state,
				);
			}

			if (showMinimap && state.minimapContext) {
				const filteredElementsList = sortedElements.filter(minimapFilter);
				const ratio = calcRatioForMinimap(filteredElementsList, width, height, minimapWidth, minimapHeight, tileSize * state.zoom);

				renderCanvas(
					state.minimapContext,
					minimapWidth,
					minimapHeight,
					filteredElementsList,
					tileSize / ratio,
					{ left: minimapWidth / 2, top: minimapHeight / 2, deltaLeft: 0, deltaTop: 0, zoom: 1 },
				);
			}

			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		return () => { shouldRender = false; };
	}, [state.left, state.top, state.deltaLeft, state.deltaTop, state.zoom, state.context, onFrame]);

	return (
		<>
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

			{showMinimap && <canvas
				ref={canvasMapRef}
				width={minimapWidth}
				height={minimapHeight}
				className="canvas2d-wrapper-minimap"
			/>}
		</>
	);
}
