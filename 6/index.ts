import { uniqBy } from 'es-toolkit';
import { type ProgramDefinition } from '../utils';

type Direction = 'up' | 'down' | 'left' | 'right';

interface Location {
    y: number
    x: number
    direction: Direction
}

export default class Program implements ProgramDefinition {
    isWithinBounds(y: number, x: number, height: number, width: number) {
        return y >= 0 && y < height && x >= 0 && x < width;
    }

    getTile(map: string[][], y: number, x: number) {
        return this.isWithinBounds(y, x, map.length, map[0].length) ? map[y][x] : '.';
    }

    getPath(map: string[][]) {
        const localMap = structuredClone(map);
        const height = localMap.length;
        const width = localMap[0].length;

        let direction: Direction = 'up';
        let guardY = 0;
        let guardX = 0;
        const path: Location[] = [];

        for (let y = 0; y < height; y += 1) {
            for (let x = 0; x < width; x += 1) {
                const char = map[y][x];

                if (char === '^' || char === 'v' || char === '<' || char === '>') {
                    switch (char) {
                        case '^': {
                            direction = 'up';
                            break;
                        }
                        case 'v': {
                            direction = 'down';
                            break;
                        }
                        case '<': {
                            direction = 'left';
                            break;
                        }
                        case '>': {
                            direction = 'right';
                            break;
                        }
                        // no default
                    }

                    guardY = y;
                    guardX = x;
                    localMap[y][x] = '.';
                    path.push({ y, x, direction });
                }
            }
        }

        do {
            try {
                switch (direction) {
                    case 'up': {
                        const tile = this.getTile(localMap, guardY - 1, guardX);

                        if (tile === '.') {
                            guardY -= 1;
                        } else {
                            throw new Error('Cannot move');
                        }
                        break;
                    }
                    case 'down': {
                        const tile = this.getTile(localMap, guardY + 1, guardX);

                        if (tile === '.') {
                            guardY += 1;
                        } else {
                            throw new Error('Cannot move');
                        }
                        break;
                    }
                    case 'left': {
                        const tile = this.getTile(localMap, guardY, guardX - 1);

                        if (tile === '.') {
                            guardX -= 1;
                        } else {
                            throw new Error('Cannot move');
                        }
                        break;
                    }
                    case 'right': {
                        const tile = this.getTile(localMap, guardY, guardX + 1);

                        if (tile === '.') {
                            guardX += 1;
                        } else {
                            throw new Error('Cannot move');
                        }
                        break;
                    }
                    // no default
                }
            } catch {
                switch (direction) {
                    case 'up': {
                        direction = 'right';
                        break;
                    }
                    case 'right': {
                        direction = 'down';
                        break;
                    }
                    case 'down': {
                        direction = 'left';
                        break;
                    }
                    case 'left': {
                        direction = 'up';
                        break;
                    }
                    // no default
                }
            }

            path.push({ y: guardY, x: guardX, direction });

            if (path.length > 10_000) {
                throw new Error('Infinite loop');
            }
        } while (this.isWithinBounds(guardY, guardX, height, width));

        return path.slice(0, -1);
    }

    runPart1(input: string[]) {
        const map = input.map((line) => [...line]);
        const path = this.getPath(map);

        return uniqBy(path, (coord) => `${coord.y},${coord.x}`).length;
    }

    runPart2(input: string[]) {
        const map = input.map((line) => [...line]);
        const path = this.getPath(map);
        const uniqueCoords = uniqBy(path, (coord) => `${coord.y},${coord.x}`);

        const maps = uniqueCoords.slice(1).map(({ y, x }) => {
            const localMap = structuredClone(map);

            localMap[y][x] = '#';

            return localMap;
        });

        let infiteLoopCount = 0;

        for (const localMap of maps) {
            try {
                // TODO: check for looping paths
                this.getPath(localMap);
            } catch {
                infiteLoopCount += 1;
            }
        }

        return infiteLoopCount;
    }
}
