import Program from '.';
import { parseInputString } from '../utils';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 2', async () => {
        const output = await program.runPart1(parseInputString(`
            ...0...
            ...1...
            ...2...
            6543456
            7.....7
            8.....8
            9.....9
        `));

        expect(output).toEqual(2);
    });

    it('should return 4', async () => {
        const output = await program.runPart1(parseInputString(`
            ..90..9
            ...1.98
            ...2..7
            6543456
            765.987
            876....
            987....
        `));

        expect(output).toEqual(4);
    });

    it('should return 3', async () => {
        const output = await program.runPart1(parseInputString(`
            10..9..
            2...8..
            3...7..
            4567654
            ...8..3
            ...9..2
            .....01
        `));

        expect(output).toEqual(3);
    });

    it('should return 36', async () => {
        const output = await program.runPart1(parseInputString(`
            89010123
            78121874
            87430965
            96549874
            45678903
            32019012
            01329801
            10456732
        `));

        expect(output).toEqual(36);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 81', () => {
        const output = program.runPart2(parseInputString(`
            89010123
            78121874
            87430965
            96549874
            45678903
            32019012
            01329801
            10456732
        `));

        expect(output).toEqual(81);
    });
});
