import React, { useCallback, useEffect, useState } from 'react';
import elementClick from './events/elementClick';
import elementRightClick from './events/elementRightClick';
import mouseMove from './events/mouseMove';
import mouseWheel from './events/mouseWheel';
import calcRatioForMinimap from './functions/calcRatioForMinimap';
import sortElements from './functions/sortElements';
import './index.css';
import renderCanvas from './render/renderCanvas';
import CanvasObject from './shapes/CanvasObject.ts';
import { Canvas2DProps } from './types/Canvas2DProps';
import Canvas2DState from './types/Canvas2DState';

const elements: { [id: string]: CanvasObject[] } = {};

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
	minimapFilter = (_e) => true,
	...otherProps
}: Canvas2DProps) {
	if (!elements[otherProps.id]) {
		elements[otherProps.id] = [];
	}

	// Hooks
	const [state, setState] = useState<Canvas2DState>({
		left: 0,
		top: 0,
		width: 0,
		height: 0,
		zoom: 0,
		deltaTop,
		deltaLeft,
		prevX: null,
		prevY: null,
	});
	const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
		if (canvas !== null) {
			const context = canvas.getContext('2d');
			if (!context) {
				return;
			}

			if (!smoothingQuality) {
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

	const canvasMapRef = useCallback((minimapCanvas: HTMLCanvasElement) => {
		if (minimapCanvas !== null) {
			const minimapContext = minimapCanvas.getContext('2d');
			if (!minimapContext) {
				return;
			}

			setState((s) => ({
				...s,
				minimapBoundingClientRect: minimapCanvas.getBoundingClientRect(),
				minimapCanvas,
				minimapContext,
			}));
		}
	}, []);

	state.deltaTop = deltaTop;
	state.deltaLeft = deltaLeft;

	// Check inputs
	if (minZoom > maxZoom) {
		throw new Error('minZoom should be lower than maxZoom.');
	}

	// Render
	let onMouseMove: undefined | ((e: React.PointerEvent) => void);
	if (trackMouseMove) {
		onMouseMove = (e: React.PointerEvent) => mouseMove(e, elements[otherProps.id], tileSize, state, setState, lockXAxis, lockYAxis, dragObjects, onElementMoved, onHover);
	}

	const onWheelFn = (e: React.WheelEvent) => {
		if (onWheel) {
			onWheel(e.nativeEvent);
		}

		if (minZoom !== maxZoom) {
			mouseWheel(e, state, setState, minZoom, maxZoom);
		}
	};

	let onClickFn;
	if (onClick) {
		onClickFn = (e: React.MouseEvent) => onClick(elementClick(e, elements[otherProps.id], tileSize, state));
	}


	// Right click Event
	useEffect(() => {
		function onRightClickEvent(e: MouseEvent) {
			e.preventDefault();
			if (onRightClick) {
				onRightClick(elementRightClick(e, elements[otherProps.id], tileSize, state));
			}
		}

		if (onRightClick && state.canvas) {
			state.canvas.addEventListener('contextmenu', onRightClickEvent);
			return () => { state.canvas?.removeEventListener('contextmenu', onRightClickEvent); };
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
				const ratio = calcRatioForMinimap(filteredElementsList, width, height, minimapWidth, minimapHeight, tileSize);

				renderCanvas(
					state.minimapContext,
					minimapWidth,
					minimapHeight,
					filteredElementsList,
					tileSize / ratio,
					{ left: minimapWidth / 2, top: minimapHeight / 2, deltaLeft: 0, deltaTop: 0, zoom: 1, width: minimapWidth, height: minimapHeight, prevX: null, prevY: null },
				);
			}

			window.requestAnimationFrame(render);
		}
		window.requestAnimationFrame(render);

		return () => { shouldRender = false; };
	}, [state.left, state.top, state.deltaLeft, state.deltaTop, state.zoom, state.context, onFrame]);

	// On width/height change: reset view and setState
	useEffect(() => {
		setState((s) => ({
			...s,
			left: width / 2,
			top: height / 2,
			width,
			height,
		}));
	}, [width, height]);

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

			{
				showMinimap && <canvas
					ref={canvasMapRef}
					width={minimapWidth}
					height={minimapHeight}
					className="canvas2d-wrapper-minimap"
				/>}
		</>
	);
}
