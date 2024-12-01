// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        root: './',
        coverage: {
            reporter: [
                'json-summary',
                'text',
            ],
            reportOnFailure: true,
        },
    },
});
