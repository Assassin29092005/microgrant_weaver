export type SettingKey =
  | 'theme_warmth'
  | 'font_size_scale'
  | 'card_texture'
  | 'progress_bar_style'
  | 'date_format'
  | 'backer_anonymity'
  | 'currency_symbol'
  | 'notification_sound'
  | 'sort_order';

export type ProgressBarStyle = 'quill' | 'hourglass' | 'thread';
export type DateFormat = 'relative' | 'short' | 'long';
export type CurrencySymbol = '$' | '£' | '€' | '₹';
export type NotificationSound = 'chime' | 'bell' | 'harp' | 'none';
export type SortOrder = 'newest' | 'most_funded' | 'almost_there';
export type BackerAnonymity = 'show_name' | 'anonymous';

export interface Settings {
  theme_warmth: number;
  font_size_scale: number;
  card_texture: number;
  progress_bar_style: ProgressBarStyle;
  date_format: DateFormat;
  backer_anonymity: BackerAnonymity;
  currency_symbol: CurrencySymbol;
  notification_sound: NotificationSound;
  sort_order: SortOrder;
}

export interface SettingDefinition {
  key: SettingKey;
  label: string;
  description: string;
  mutate: (value: never) => Settings[SettingKey];
}

export interface Mutation {
  key: SettingKey;
  oldValue: Settings[SettingKey];
  newValue: Settings[SettingKey];
}

export interface RippleResult {
  mutations: Mutation[];
}

export interface RippleEvent {
  id: string;
  triggeredBy: SettingKey;
  mutations: Mutation[];
  timestamp: number;
}

export const DEFAULT_SETTINGS: Settings = {
  theme_warmth: 50,
  font_size_scale: 1.0,
  card_texture: 0.5,
  progress_bar_style: 'quill',
  date_format: 'relative',
  backer_anonymity: 'show_name',
  currency_symbol: '$',
  notification_sound: 'chime',
  sort_order: 'newest',
};
