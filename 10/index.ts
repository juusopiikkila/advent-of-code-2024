import { uniqBy } from 'es-toolkit';
import {
    type Coord,
    type ProgramDefinition,
} from '../utils';

class Hiker {
    constructor(
        public x: number,
        public y: number,
        public elevation: number,
        private map: number[][],
        public visited: Coord[] = [],
    ) {}

    getAdjacentCoords(): Coord[] {
        return [
            { y: this.y, x: this.x - 1 }, // left
            { y: this.y, x: this.x + 1 }, // right
            { y: this.y - 1, x: this.x }, // up
            { y: this.y + 1, x: this.x }, // down
        ].filter((coord) => this.map[coord.y]?.[coord.x] !== undefined);
    }

    getTileValue(coord: Coord): number | undefined {
        return this.map[coord.y]?.[coord.x];
    }

    hike(): Hiker[] {
        if (this.elevation === 9) {
            return [this];
        }

        const availableCoords = this.getAdjacentCoords();
        const nextCoords = availableCoords.filter((coord) => (
            this.getTileValue(coord) === this.elevation + 1
        ));

        return nextCoords
            .flatMap((coord) => new Hiker(
                coord.x,
                coord.y,
                this.elevation + 1,
                this.map,
                [...this.visited, coord],
            ).hike());
    }
}

export default class Program implements ProgramDefinition {
    getMap(input: string[]): number[][] {
        return input.map((line) => [...line].map(Number));
    }

    getStartingCoords(map: number[][]): Coord[] {
        const coords: Coord[] = [];

        for (const [y, line] of map.entries()) {
            for (const [x, tile] of line.entries()) {
                if (tile === 0) {
                    coords.push({ x, y });
                }
            }
        }

        return coords;
    }

    hike(map: number[][], coords: Coord[]): Hiker[] {
        return coords
            .map((coord) => new Hiker(coord.x, coord.y, 0, map, [coord]))
            .flatMap((hiker) => hiker.hike());
    }

    async runPart1(input: string[]) {
        const map = this.getMap(input);
        const coords = this.getStartingCoords(map);

        return uniqBy(
            this.hike(map, coords),
            (hiker) => `${hiker.y},${hiker.x},${hiker.visited[0].y},${hiker.visited[0].x}`,
        ).length;
    }

    runPart2(input: string[]) {
        const map = this.getMap(input);
        const coords = this.getStartingCoords(map);

        return this.hike(map, coords).length;
    }
}
