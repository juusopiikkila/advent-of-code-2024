/* eslint-disable @typescript-eslint/no-loop-func */
import type { ProgramDefinition } from '../utils';

interface BaseBlock {
    type: 'file' | 'empty'
}

interface FileBlock extends BaseBlock {
    type: 'file'
    id: number
    length: number
}

interface EmptyBlock extends BaseBlock {
    type: 'empty'
    length: number
}

type Block = FileBlock | EmptyBlock;

export default class Program implements ProgramDefinition {
    unpackDiskMap(input: string): Block[] {
        const sequence = [...input].map(Number);
        const blocks: Block[] = [];
        let isFreeSpace = false;
        let id = 0;

        for (const part of sequence) {
            if (isFreeSpace) {
                blocks.push({
                    type: 'empty',
                    length: part,
                });

                isFreeSpace = false;
            } else {
                isFreeSpace = true;

                blocks.push({
                    type: 'file',
                    id,
                    length: part,
                });

                id += 1;
            }
        }

        return blocks;
    }

    getChecksum(input: (string | number)[]): number {
        return input.reduce<number>((accumulator, current, index) => (
            accumulator + (typeof current === 'number' ? current * index : 0)
        ), 0);
    }

    runPart1(input: string[]) {
        const blocks = this.unpackDiskMap(input[0]);

        const result = blocks
            .flatMap((block) => (
                Array
                    .from({ length: block.length })
                    .map(() => (block.type === 'file' ? block.id : '.'))
            ));

        for (const [index, part] of result.entries()) {
            if (part === '.') {
                const lastNumberIndexReversed = [...result].reverse().findIndex((x) => x !== '.');
                const lastNumberIndex = result.length - 1 - lastNumberIndexReversed;

                if (lastNumberIndex <= index) {
                    break;
                }

                result[index] = result[lastNumberIndex];
                result[lastNumberIndex] = '.';
            }
        }

        return this.getChecksum(result);
    }

    runPart2(input: string[]) {
        const blocks = this.unpackDiskMap(input[0]);

        // eslint-disable-next-line unicorn/prefer-array-find
        let currentBlockId = blocks.filter((block) => block.type === 'file').at(-1)?.id ?? 0;

        while (currentBlockId > 0) {
            const currentBlockIndex = blocks.findIndex((block) => block.type === 'file' && block.id === currentBlockId);
            const currentBlock = blocks[currentBlockIndex] as FileBlock;

            const firstValidEmptyBlockIndex = blocks
                .slice(0, currentBlockIndex)
                .findIndex((block) => (
                    block.type === 'empty'
                    && block.length >= currentBlock.length
                ));

            if (firstValidEmptyBlockIndex !== -1) {
                // Decrease length of the first valid empty block
                blocks[firstValidEmptyBlockIndex].length -= currentBlock.length;

                // Insert current block before the first valid empty block
                blocks.splice(firstValidEmptyBlockIndex, 0, currentBlock);

                // Replace current block with an empty block
                blocks.splice(currentBlockIndex + 1, 1, {
                    type: 'empty',
                    length: currentBlock.length,
                });

                // Remove empty block if it's length is 0
                if (blocks[firstValidEmptyBlockIndex].length === 0) {
                    blocks.splice(firstValidEmptyBlockIndex, 1);
                }
            }

            currentBlockId -= 1;
        }

        return this.getChecksum(
            blocks
                .flatMap((block) => (
                    Array
                        .from({ length: block.length })
                        .map(() => (block.type === 'file' ? block.id : '.'))
                )),
        );
    }
}
