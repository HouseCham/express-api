module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.test.ts',     // For files in __tests__ folders
        '**/?(*.)+(spec|test).ts'        // For files with .spec.ts or .test.ts suffix
    ],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',  // Supports path aliases
    },
};
