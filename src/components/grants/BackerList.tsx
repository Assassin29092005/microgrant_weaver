import ParchmentCard from '../ui/ParchmentCard';
import { useButterflyStore } from '../../store/butterflyStore';
import type { Backer } from '../../types/project';

interface BackerListProps {
  backers: Backer[];
}

export default function BackerList({ backers }: BackerListProps) {
  const backerAnonymity = useButterflyStore((s) => s.settings.backer_anonymity);
  const currencySymbol = useButterflyStore((s) => s.settings.currency_symbol);

  if (backers.length === 0) {
    return (
      <ParchmentCard noFold className="p-6 text-center">
        <p className="text-2xl mb-2" aria-hidden="true">📜</p>
        <p className="font-body italic text-sm"
          style={{ color: 'var(--color-ink-faded)' }}>
          The ledger is empty — be the first to weave in.
        </p>
      </ParchmentCard>
    );
  }

  return (
    <ParchmentCard noFold className="p-6">
      <h3 className="font-display text-lg font-bold mb-4"
        style={{ color: 'var(--color-ink)' }}>
        📜 The Ledger
      </h3>
      <div className="max-h-80 overflow-y-auto pr-2">
        {backers.map((backer) => {
          const displayName = backerAnonymity === 'anonymous' || backer.isAnonymous
            ? 'A Neighbor'
            : backer.name;

          return (
            <div key={backer.id} className="ledger-row">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold truncate"
                  style={{ color: 'var(--color-ink)' }}>
                  {displayName}
                </p>
                {backer.message && (
                  <p className="text-xs italic truncate mt-0.5"
                    style={{ color: 'var(--color-ink-faded)' }}>
                    "{backer.message}"
                  </p>
                )}
              </div>
              <div className="flex flex-col items-end ml-3 shrink-0">
                <span className="ledger-amount text-sm">
                  {currencySymbol}{backer.amount}
                </span>
                <span className="text-xs font-mono mt-0.5"
                  style={{ color: 'var(--color-sepia-mid)' }}>
                  {backer.date}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </ParchmentCard>
  );
}
