import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    runPart1(input: string[]) {
        const regex = /(mul\([0-9]+,[0-9]+\))/g;
        const matches = input.join('').match(regex);

        if (!matches) {
            throw new Error('No matches found');
        }

        return matches.reduce((accumulator, match) => {
            const numbers = match.match(/([0-9]+)/g)?.map(Number);

            if (!numbers) {
                throw new Error('Invalid input');
            }

            return accumulator + (numbers[0] * numbers[1]);
        }, 0);
    }

    runPart2(input: string[]) {
        const regex = /(mul\([0-9]+,[0-9]+\)|don't\(\)|do\(\))/g;
        const matches = input.join('').match(regex);

        if (!matches) {
            throw new Error('No matches found');
        }

        let result = 0;
        let shouldMultiply = true;

        for (const match of matches) {
            if (match === 'do()') {
                shouldMultiply = true;

                continue;
            }

            if (match === "don't()") {
                shouldMultiply = false;

                continue;
            }

            const numbers = match.match(/([0-9]+)/g)?.map(Number);

            if (!numbers) {
                throw new Error('Invalid input');
            }

            if (shouldMultiply) {
                result += numbers[0] * numbers[1];
            }
        }

        return result;
    }
}
