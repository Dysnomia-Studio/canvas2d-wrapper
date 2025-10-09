export default function calcTileSize(tileSize: number, zoom: number): number {
	return tileSize * zoom;
}
