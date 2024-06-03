export type DiscordAppearanceColor = 'dark' | 'light';

export type DiscordAppearanceDisplay = 'cozy' | 'compact';

export type DiscordAppearanceFontSize = 12 | 14 | 15 | 16 | 18 | 20 | 24;

export interface DiscordAppearance {
    color: DiscordAppearanceColor;
    display: DiscordAppearanceDisplay;
    fontSize: DiscordAppearanceFontSize;
}

export const DefaultDiscordAppearance: DiscordAppearance = {
    color: 'dark',
    display: 'cozy',
    fontSize: 16
};
