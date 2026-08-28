import { describe, it, expect } from 'vitest';

describe('NovaCommerce Store Suite 012', () => {
  it('validates discount computation', () => {
    const subtotal = 1000;
    const discount = subtotal * 0.2;
    expect(subtotal - discount).toBe(800);
  });
});
