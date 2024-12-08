import type { Coord, ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    getAntennas(map: string[][]) {
        const antennas: Record<string, Coord[]> = {};

        for (const [y, row] of map.entries()) {
            for (const [x, cell] of row.entries()) {
                if (cell !== '.') {
                    if (!antennas[cell]) {
                        antennas[cell] = [];
                    }

                    antennas[cell].push({ x, y });
                }
            }
        }

        return antennas;
    }

    getMirroredCoords(coord1: Coord, coord2: Coord): Coord {
        const xDiff = coord2.x - coord1.x;
        const yDiff = coord2.y - coord1.y;

        return {
            x: coord2.x + xDiff,
            y: coord2.y + yDiff,
        };
    }

    runPart1(input: string[]) {
        const map = input.map((row) => [...row]);
        const antennas = this.getAntennas(map);
        let antinodeCount = 0;

        for (const coords of Object.values(antennas)) {
            for (const [index, coord] of coords.entries()) {
                for (const [index2, coord2] of coords.entries()) {
                    if (index === index2) {
                        continue;
                    }

                    const mirroredCoord = this.getMirroredCoords(coord, coord2);

                    if (
                        map[mirroredCoord.y]?.[mirroredCoord.x]
                        && map[mirroredCoord.y][mirroredCoord.x] !== '#'
                    ) {
                        map[mirroredCoord.y][mirroredCoord.x] = '#';
                        antinodeCount += 1;
                    }
                }
            }
        }

        return antinodeCount;
    }

    runPart2(input: string[]) {
        const map = input.map((row) => [...row]);
        const antennas = this.getAntennas(map);

        for (const coords of Object.values(antennas)) {
            for (const [index, coord] of coords.entries()) {
                for (const [index2, coord2] of coords.entries()) {
                    if (index === index2) {
                        continue;
                    }

                    let localCoord1 = coord;
                    let localCoord2 = coord2;

                    // eslint-disable-next-line no-constant-condition
                    while (true) {
                        const mirroredCoord = this.getMirroredCoords(localCoord1, localCoord2);

                        if (!map[mirroredCoord.y]?.[mirroredCoord.x]) {
                            break;
                        }

                        if (map[mirroredCoord.y][mirroredCoord.x] !== '#') {
                            map[mirroredCoord.y][mirroredCoord.x] = '#';
                        }

                        localCoord1 = localCoord2;
                        localCoord2 = mirroredCoord;
                    }
                }
            }
        }

        return map
            .map((row) => row.filter((cell) => cell !== '.').join(''))
            .join('')
            .length;
    }
}
