import type { ProgramDefinition } from '../utils';

export default class Program implements ProgramDefinition {
    isLevelIncreasing(level: number[]) {
        for (let index = 1; index < level.length; index += 1) {
            if (level[index] < level[index - 1]) {
                return false;
            }
        }

        return true;
    }

    isLevelDecreasing(level: number[]) {
        for (let index = 1; index < level.length; index += 1) {
            if (level[index] > level[index - 1]) {
                return false;
            }
        }

        return true;
    }

    isLevelChangeGradual(level: number[]) {
        for (let index = 1; index < level.length; index += 1) {
            const change = Math.abs(level[index] - level[index - 1]);

            if (change < 1 || change > 3) {
                return false;
            }
        }

        return true;
    }

    isLevelSafe(level: number[]) {
        return (
            this.isLevelIncreasing(level)
            || this.isLevelDecreasing(level)
        ) && this.isLevelChangeGradual(level);
    }

    runPart1(input: string[]) {
        const levels = input.map((row) => row.split(' ').map(Number));

        return levels.filter((level) => this.isLevelSafe(level)).length;
    }

    runPart2(input: string[]) {
        const levels = input.map((row) => row.split(' ').map(Number));

        return levels.filter((level) => {
            const permutations: number[][] = [level];

            for (let index = 0; index < level.length; index += 1) {
                const permutation = [...level];
                permutation.splice(index, 1);

                permutations.push(permutation);
            }

            return permutations.some((permutation) => this.isLevelSafe(permutation));
        }).length;
    }
}
