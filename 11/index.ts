/* little help from https://www.reddit.com/r/adventofcode/comments/1hbmjm3/2024_day_11_posting_here_while_my_code_is_still/ */

import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    evolveStone(stone: number): [number] | [number, number] {
        // if the stone is 0, return 1
        if (stone === 0) {
            return [1];
        }

        const stoneString = stone.toString();
        const stoneStringLength = stoneString.length;

        // if the stone is even, split it in half
        if (stoneStringLength % 2 === 0) {
            const mid = stoneStringLength / 2;
            const left = stoneString.slice(0, mid);
            const right = stoneString.slice(mid);

            return [Number(left), Number(right)];
        }

        // otherwise, return the stone multiplied by 2024
        return [stone * 2024];
    }

    evolve(map: Record<string, number>) {
        const localMap = { ...map };
        const stones = Object.entries(localMap)
            .filter(([, count]) => count > 0)
            .map(([stone]) => Number(stone));

        for (const stone of stones) {
            // get the count of the stone
            const stoneCount = map[stone];

            // remove the stone from the map
            localMap[stone] -= stoneCount;

            // get the result of evolving the stone
            const result = this.evolveStone(Number(stone));

            // add the evolved stones to the map
            for (const newStone of result) {
                if (localMap[newStone] === undefined) {
                    localMap[newStone] = 0;
                }

                // add the count of the stone
                localMap[newStone] += stoneCount;
            }
        }

        return Object.fromEntries(Object.entries(localMap).filter(([, count]) => count > 0));
    }

    blink(stones: number[], times: number) {
        let map: Record<string, number> = {};

        for (const stone of stones) {
            if (map[stone] === undefined) {
                map[stone] = 0;
            }

            map[stone] += 1;
        }

        for (let index = 0; index < times; index += 1) {
            map = this.evolve(map);
        }

        return Object.values(map).reduce((accumulator, current) => accumulator + current, 0);
    }

    runPart1(input: string[], times = 25) {
        const stones = input[0].split(' ').map(Number);

        return this.blink(stones, times);
    }

    runPart2(input: string[]) {
        return this.runPart1(input, 75);
    }
}
