import React, { useCallback, useEffect } from 'react';
import elementClick from './events/elementClick';
import elementRightClick from './events/elementRightClick';
import mouseMove from './events/mouseMove';
import mouseWheel from './events/mouseWheel';
import calcRatioForMinimap from './functions/calcRatioForMinimap';
import sortElements from './functions/sortElements';
import useCanvasState from './hooks/useCanvasState.ts';
import useCanvasStateSetter from './hooks/useCanvasStateSetter.ts';
import './index.css';
import { Position2D } from './main.ts';
import renderCanvas from './render/renderCanvas';
import CanvasObject from './shapes/CanvasObject.ts';
import { Canvas2DProps } from './types/Canvas2DProps';

const elements: { [id: string]: CanvasObject[] } = {};
const initialClickMousePosition: { [id: string]: Position2D } = {};
const HASMOVED_MIN_MOVEMENT = 5; // px

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
	showMinimap = false,
	minimapWidth = 240,
	minimapHeight = 120,
	minimapDisplayFilter = (_e) => true,
	minimapAutomaticZoomFilter = (_e) => true,
	...otherProps
}: Readonly<Canvas2DProps>) {
	if (!elements[otherProps.id]) {
		elements[otherProps.id] = [];
	}

	// Hooks
	const state = useCanvasState(otherProps.id);
	const setState = useCanvasStateSetter(otherProps.id);

	const canvasRef = useCallback((canvas: HTMLCanvasElement) => {
		if (canvas !== null) {
			const context = canvas.getContext('2d');
			if (!context) {
				return;
			}

			if (smoothingQuality) {
				context.imageSmoothingEnabled = true;
				context.imageSmoothingQuality = smoothingQuality;
			} else {
				context.imageSmoothingEnabled = false;
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

	const onWheelFn = useCallback((e: React.WheelEvent) => {
		if (onWheel) {
			onWheel(e.nativeEvent);
		}

		if (minZoom !== maxZoom) {
			mouseWheel(e, setState, minZoom, maxZoom, tileSize);
		}
	}, [onWheel, maxZoom, minZoom]);

	// Check inputs
	if (minZoom > maxZoom) {
		throw new Error('minZoom should be lower than maxZoom.');
	}

	// Render
	let onMouseMove: undefined | ((e: React.PointerEvent) => void);
	if (trackMouseMove) {
		onMouseMove = (e: React.PointerEvent) => mouseMove(e, elements[otherProps.id], tileSize, state, setState, lockXAxis, lockYAxis, dragObjects, onElementMoved, onHover);
	}

	let onClickFn;
	if (onClick) {
		onClickFn = (e: React.MouseEvent) => {
			let hasMoved = false;
			if (initialClickMousePosition[otherProps.id]) {
				hasMoved = Math.abs(initialClickMousePosition[otherProps.id].x - e.nativeEvent.screenX) > HASMOVED_MIN_MOVEMENT || Math.abs(initialClickMousePosition[otherProps.id].y - e.nativeEvent.screenY) > HASMOVED_MIN_MOVEMENT;
			}
			onClick(elementClick(e, elements[otherProps.id], tileSize, state, hasMoved));
		};
	}

	// Click: monitore movement
	useEffect(() => {
		if (onClick && state.canvas) {
			function clickMonitoring(e: MouseEvent) {
				initialClickMousePosition[otherProps.id] = { x: e.screenX, y: e.screenY };
			}

			state.canvas.addEventListener('mousedown', clickMonitoring);
			return () => { state.canvas?.removeEventListener('mousedown', clickMonitoring); };
		}
	}, [state.canvas, onClick, otherProps.id]);


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
				const filteredElementsList = sortedElements.filter(minimapDisplayFilter);
				const ratio = calcRatioForMinimap(filteredElementsList.filter(minimapAutomaticZoomFilter), width, height, minimapWidth, minimapHeight, tileSize);

				renderCanvas(
					state.minimapContext,
					minimapWidth,
					minimapHeight,
					filteredElementsList,
					tileSize / ratio,
					{ left: minimapWidth / 2, top: minimapHeight / 2, zoom: 1, width: minimapWidth, height: minimapHeight, prevX: null, prevY: null },
				);
			}

			globalThis.requestAnimationFrame(render);
		}
		globalThis.requestAnimationFrame(render);

		return () => { shouldRender = false; };
	}, [state.left, state.top, state.zoom, state.context, onFrame]);

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
