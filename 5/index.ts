import type { ProgramDefinition } from '../utils';

interface OrderingRule {
    after: number
    before: number
}

export default class Program implements ProgramDefinition {
    getOrderingRulesAndUpdates(input: string[]) {
        const orderingRules: OrderingRule[] = [];
        const updates: number[][] = [];

        for (const line of input) {
            if (line.includes('|')) {
                const [before, after] = line.split('|').map(Number);
                orderingRules.push({ before, after });
            } else if (line.includes(',')) {
                updates.push(line.split(',').map(Number));
            }
        }

        return { orderingRules, updates };
    }

    isUpdateValid(update: number[], orderingRules: OrderingRule[]) {
        const applicableRules = orderingRules.filter((item) => (
            update.includes(item.after) && update.includes(item.before)
        ));

        for (const [index, number] of update.entries()) {
            const rules = applicableRules.filter((item) => item.after === number);

            for (const rule of rules) {
                if (update.indexOf(rule.before) >= index) {
                    return false;
                }
            }
        }

        return true;
    }

    fixUpdate(update: number[], orderingRules: OrderingRule[]) {
        const localUpdate = [...update];

        const applicableRules = orderingRules.filter((item) => (
            update.includes(item.after) && update.includes(item.before)
        ));

        while (!this.isUpdateValid(localUpdate, orderingRules)) {
            for (const [index, number] of localUpdate.entries()) {
                const rules = applicableRules.filter((item) => item.after === number);

                for (const rule of rules) {
                    const beforeIndex = localUpdate.indexOf(rule.before);

                    if (beforeIndex >= index) {
                        const temporaryNumber = localUpdate[index];

                        localUpdate[index] = localUpdate[beforeIndex];
                        localUpdate[beforeIndex] = temporaryNumber;
                    }
                }
            }
        }

        return localUpdate;
    }

    runPart1(input: string[]) {
        const { orderingRules, updates } = this.getOrderingRulesAndUpdates(input);

        const validUpdates = updates.filter((update) => this.isUpdateValid(update, orderingRules));
        const middleNumbers = validUpdates.map((update) => update[Math.floor(update.length / 2)]);

        return middleNumbers.reduce((accumulator, number) => accumulator + number, 0);
    }

    runPart2(input: string[]) {
        const { orderingRules, updates } = this.getOrderingRulesAndUpdates(input);

        const invalidUpdates = updates.filter((update) => !this.isUpdateValid(update, orderingRules));
        const fixedUpdates = invalidUpdates.map((update) => this.fixUpdate(update, orderingRules));
        const middleNumbers = fixedUpdates.map((update) => update[Math.floor(update.length / 2)]);

        return middleNumbers.reduce((accumulator, number) => accumulator + number, 0);
    }
}
