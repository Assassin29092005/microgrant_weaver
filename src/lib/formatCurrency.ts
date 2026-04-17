import type { CurrencySymbol } from '../types/butterfly';

export function formatCurrency(amount: number, symbol: CurrencySymbol = '$'): string {
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

export function formatCurrencyDetailed(amount: number, symbol: CurrencySymbol = '$'): string {
  return `${symbol}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

export function formatPercentage(raised: number, goal: number): number {
  if (goal <= 0) return 0;
  return Math.min(Math.round((raised / goal) * 100), 100);
}
