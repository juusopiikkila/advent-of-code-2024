import { unzip } from 'es-toolkit';
import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    getColumns(input: string[]) {
        const pairs = input.map((line) => line.split(/\s+/).map(Number));

        const [left, right] = unzip(pairs);

        return [left, right];
    }

    runPart1(input: string[]) {
        const [left, right] = this.getColumns(input);

        left.sort((a, b) => a - b);
        right.sort((a, b) => a - b);

        return left.reduce((accumulator, number, index) => (
            accumulator + Math.abs(number - right[index])
        ), 0);
    }

    runPart2(input: string[]) {
        const [left, right] = this.getColumns(input);

        return left.reduce((accumulator, number) => (
            accumulator + (number * right.filter((rightNumber) => rightNumber === number).length)
        ), 0);
    }
}
