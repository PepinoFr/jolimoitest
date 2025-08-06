// roman.test.js
import { describe, it, expect } from 'vitest';
import { toRoman } from './index.js';

describe('toRoman', () => {
    describe('conversion', () => {

        it('converts 1 to I', () => {
            expect(toRoman(1)).toBe('I');
        });

        it('converts 4 to IV', () => {
            expect(toRoman(4)).toBe('IV');
        });

        it('converts 9 to IX', () => {
            expect(toRoman(9)).toBe('IX');
        });

        it('converts 40 to XL', () => {
            expect(toRoman(40)).toBe('XL');
        });

        it('converts 100 to C', () => {
            expect(toRoman(100)).toBe('C');
        });

        it('converts 99 to XCIX', () => {
            expect(toRoman(99)).toBe('XCIX');
        });
    })
    describe('error handling', () => {
    
    it('throws an error for 0', () => {
        expect(() => toRoman(0)).toThrow();
    });

    it('throws an error for > 100', () => {
        expect(() => toRoman(101)).toThrow();
    });
})
});
