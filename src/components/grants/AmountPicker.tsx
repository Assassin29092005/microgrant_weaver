import InkButton from '../ui/InkButton';
import { useButterflyStore } from '../../store/butterflyStore';

interface AmountPickerProps {
  selectedAmount: number;
  onSelect: (amount: number) => void;
}

const presetAmounts = [1, 5, 10, 25];

export default function AmountPicker({ selectedAmount, onSelect }: AmountPickerProps) {
  const currencySymbol = useButterflyStore((s) => s.settings.currency_symbol);

  return (
    <div>
      <label className="block text-sm font-bold mb-2"
        style={{ color: 'var(--color-ink)' }}>
        Choose your weave
      </label>
      <div className="flex flex-wrap gap-2 mb-3">
        {presetAmounts.map((amount) => (
          <button
            key={amount}
            type="button"
            className="font-mono text-sm font-bold px-4 py-2 rounded transition-all duration-200 border"
            style={{
              backgroundColor: selectedAmount === amount ? 'var(--color-rust-accent)' : 'var(--color-parchment-light)',
              color: selectedAmount === amount ? 'var(--color-parchment-light)' : 'var(--color-ink)',
              borderColor: selectedAmount === amount ? 'var(--color-rust-accent)' : 'var(--color-parchment-dark)',
            }}
            onClick={() => onSelect(amount)}
            aria-label={`Donate ${currencySymbol}${amount}`}
          >
            {currencySymbol}{amount}
          </button>
        ))}
      </div>

      {/* Custom amount */}
      <div className="flex items-center gap-2">
        <span className="font-mono font-bold" style={{ color: 'var(--color-ink)' }}>{currencySymbol}</span>
        <input
          type="number"
          className="parchment-input font-mono font-bold max-w-[100px]"
          value={selectedAmount}
          onChange={(e) => onSelect(parseInt(e.target.value) || 1)}
          min={1}
          aria-label="Custom donation amount"
        />
        <InkButton variant="ghost" size="sm" onClick={() => onSelect(selectedAmount)}>
          Custom
        </InkButton>
      </div>
    </div>
  );
}
