import type { Settings, SettingKey, SettingDefinition, RippleResult } from '../types/butterfly';

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function randOffset(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

function pick<T>(options: T[]): T {
  return options[Math.floor(Math.random() * options.length)];
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const SETTINGS_CATALOG: SettingDefinition[] = [
  {
    key: 'theme_warmth',
    label: 'Parchment Warmth',
    description: 'How warm or cool the parchment tint appears',
    mutate: ((v: number) => clamp(v + randOffset(-10, 10), 0, 100)) as SettingDefinition['mutate'],
  },
  {
    key: 'font_size_scale',
    label: 'Text Size',
    description: 'Body text scale factor',
    mutate: (() => pick([0.9, 0.95, 1.0, 1.05, 1.1])) as SettingDefinition['mutate'],
  },
  {
    key: 'card_texture',
    label: 'Paper Texture',
    description: 'Intensity of the paper grain texture',
    mutate: ((v: number) => clamp(v + randOffset(-0.15, 0.15), 0, 1)) as SettingDefinition['mutate'],
  },
  {
    key: 'progress_bar_style',
    label: 'Progress Style',
    description: 'Visual style of funding progress bars',
    mutate: (() => pick(['quill', 'hourglass', 'thread'])) as SettingDefinition['mutate'],
  },
  {
    key: 'date_format',
    label: 'Date Format',
    description: 'How dates are displayed across the platform',
    mutate: (() => pick(['relative', 'short', 'long'])) as SettingDefinition['mutate'],
  },
  {
    key: 'backer_anonymity',
    label: 'Backer Names',
    description: 'Whether backer names are shown or anonymized',
    mutate: (() => pick(['show_name', 'anonymous'])) as SettingDefinition['mutate'],
  },
  {
    key: 'currency_symbol',
    label: 'Currency Symbol',
    description: 'Currency symbol used for amounts',
    mutate: (() => pick(['$', '£', '€', '₹'])) as SettingDefinition['mutate'],
  },
  {
    key: 'notification_sound',
    label: 'Notification Sound',
    description: 'Sound played on donation events',
    mutate: (() => pick(['chime', 'bell', 'harp', 'none'])) as SettingDefinition['mutate'],
  },
  {
    key: 'sort_order',
    label: 'Default Sort',
    description: 'Default sort order for project listings',
    mutate: (() => pick(['newest', 'most_funded', 'almost_there'])) as SettingDefinition['mutate'],
  },
];

export function triggerRipple(changedKey: SettingKey, currentSettings: Settings): RippleResult {
  const candidates = SETTINGS_CATALOG.filter((s) => s.key !== changedKey);
  const chosen = shuffle(candidates).slice(0, 3);
  const mutations = chosen.map((s) => ({
    key: s.key,
    oldValue: currentSettings[s.key],
    newValue: s.mutate(currentSettings[s.key] as never),
  }));
  return { mutations };
}

export function getSettingLabel(key: SettingKey): string {
  const def = SETTINGS_CATALOG.find((s) => s.key === key);
  return def?.label ?? key;
}

export function getSettingDescription(key: SettingKey): string {
  const def = SETTINGS_CATALOG.find((s) => s.key === key);
  return def?.description ?? '';
}

export function formatSettingValue(key: SettingKey, value: Settings[SettingKey]): string {
  switch (key) {
    case 'theme_warmth':
      return `${Math.round(value as number)}%`;
    case 'font_size_scale':
      return `${value}x`;
    case 'card_texture':
      return `${Math.round((value as number) * 100)}%`;
    default:
      return String(value).replace(/_/g, ' ');
  }
}

export { SETTINGS_CATALOG };
