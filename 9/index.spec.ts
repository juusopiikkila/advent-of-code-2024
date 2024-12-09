import Program from '.';

describe('Part 1', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 1928', () => {
        const output = program.runPart1(['2333133121414131402']);

        expect(output).toEqual(1928);
    });
});

describe('Part 2', () => {
    let program: Program;

    beforeEach(() => {
        program = new Program();
    });

    it('should return 2858', () => {
        const output = program.runPart2(['2333133121414131402']);

        expect(output).toEqual(2858);
    });
});
