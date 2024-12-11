import Program from '.';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 7', () => {
        const output = program.runPart1(['0 1 10 99 999'], 1);

        expect(output).toEqual(7);
    });

    it('should return 22', () => {
        const output = program.runPart1(['125 17'], 6);

        expect(output).toEqual(22);
    });
});
