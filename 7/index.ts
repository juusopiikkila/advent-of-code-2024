import { BaseN } from 'js-combinatorics';
import type { ProgramDefinition } from '../utils';

interface Equation {
    result: number
    operands: number[]
}

export default class Program implements ProgramDefinition {
    getEquations(input: string[]): Equation[] {
        const equations = input.map((data) => {
            const matches = data.match(/^(\d+): (.*?)$/);

            if (!matches) {
                throw new Error(`Invalid input: ${data}`);
            }

            const result = Number(matches[1]);
            const operands = matches[2].split(' ').map(Number);

            return {
                result,
                operands,
            };
        });

        return equations;
    }

    getPossibleEquations(equations: Equation[], operators: string[]) {
        const possibleEquations = equations.filter(({ result, operands }) => {
            const operatorCount = operands.length - 1;
            const permutations = new BaseN(operators, operatorCount);

            const results = permutations.toArray().map((permutation) => {
                let total = operands[0];

                for (const [index, operand] of operands.slice(1).entries()) {
                    // eslint-disable-next-line unicorn/prefer-switch
                    if (permutation[index] === '+') {
                        total += operand;
                    } else if (permutation[index] === '*') {
                        total *= operand;
                    } else if (permutation[index] === '||') {
                        total = Number(`${total}${operand}`);
                    }
                }

                return total;
            });

            return results.includes(result);
        });

        return possibleEquations;
    }

    runPart1(input: string[]) {
        const equations = this.getEquations(input);
        const operators = ['*', '+'];
        const possibleEquations = this.getPossibleEquations(equations, operators);

        return possibleEquations.reduce((accumulator, { result }) => accumulator + result, 0);
    }

    runPart2(input: string[]) {
        const equations = this.getEquations(input);
        const operators = ['*', '+', '||'];
        const possibleEquations = this.getPossibleEquations(equations, operators);

        return possibleEquations.reduce((accumulator, { result }) => accumulator + result, 0);
    }
}
