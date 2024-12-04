import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    getDirectionalWords(map: string[][], y: number, x: number): string[] {
        const length = 4;

        // up
        const upWord: (string | undefined)[] = [];
        for (let dy = y; dy > y - length; dy -= 1) {
            upWord.push(map[dy]?.[x]);
        }

        // down
        const downWord: (string | undefined)[] = [];
        for (let dy = y; dy < y + length; dy += 1) {
            downWord.push(map[dy]?.[x]);
        }

        // left
        const leftWord: (string | undefined)[] = [];
        for (let dx = x; dx > x - length; dx -= 1) {
            leftWord.push(map[y][dx]);
        }

        // right
        const rightWord: (string | undefined)[] = [];
        for (let dx = x; dx < x + length; dx += 1) {
            rightWord.push(map[y][dx]);
        }

        // diagonal up-left
        const upLeftWord: (string | undefined)[] = [];
        for (let d = 0; d < length; d += 1) {
            upLeftWord.push(map[y - d]?.[x - d]);
        }

        // diagonal up-right
        const upRightWord: (string | undefined)[] = [];
        for (let d = 0; d < length; d += 1) {
            upRightWord.push(map[y - d]?.[x + d]);
        }

        // diagonal down-left
        const downLeftWord: (string | undefined)[] = [];
        for (let d = 0; d < length; d += 1) {
            downLeftWord.push(map[y + d]?.[x - d]);
        }

        // diagonal down-right
        const downRightWord: (string | undefined)[] = [];
        for (let d = 0; d < length; d += 1) {
            downRightWord.push(map[y + d]?.[x + d]);
        }

        return [upWord, downWord, leftWord, rightWord, upLeftWord, upRightWord, downLeftWord, downRightWord]
            .filter((word) => !word.includes(undefined) && word.length > 0)
            .map((word) => word.join(''));
    }

    runPart1(input: string[]) {
        const map = input.map((line) => [...line]);

        let count = 0;

        for (const [y, row] of map.entries()) {
            for (const [x, char] of row.entries()) {
                if (char === 'X') {
                    const words = this.getDirectionalWords(map, y, x);

                    count += words.filter((word) => word.includes('XMAS')).length;
                }
            }
        }

        return count;
    }

    getXWords(map: string[][], y: number, x: number): string[] {
        const length = 3;

        // down
        const downWord: (string | undefined)[] = [];
        for (let d = 0; d < length; d += 1) {
            downWord.push(map[y - 1 + d]?.[x - 1 + d]);
        }

        // up
        const upWord: (string | undefined)[] = [];
        for (let d = 0; d < length; d += 1) {
            upWord.push(map[y + 1 - d]?.[x - 1 + d]);
        }

        return [downWord, upWord]
            .filter((word) => !word.includes(undefined) && word.length > 0)
            .map((word) => word.join(''));
    }

    runPart2(input: string[]) {
        const map = input.map((line) => [...line]);

        let count = 0;

        for (const [y, row] of map.entries()) {
            for (const [x, char] of row.entries()) {
                if (char === 'A') {
                    const words = this.getXWords(map, y, x);

                    if (words.filter((word) => (
                        word.includes('MAS') || word.includes('SAM')
                    )).length === 2) {
                        count += 1;
                    }
                }
            }
        }

        return count;
    }
}
