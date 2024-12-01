import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 11', () => {
        const output = program.runPart1(parseInputString(`
            3   4
            4   3
            2   5
            1   3
            3   9
            3   3
        `));

        expect(output).toEqual(11);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 31', () => {
        const output = program.runPart2(parseInputString(`
            3   4
            4   3
            2   5
            1   3
            3   9
            3   3
        `));

        expect(output).toEqual(31);
    });
});
