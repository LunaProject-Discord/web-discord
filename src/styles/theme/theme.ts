import { DefaultDiscordAppearance, DiscordAppearance } from './appearance';
import { DiscordColorPalette, DiscordDarkPalette, DiscordLightPalette } from './color';
import { DefaultDiscordCommonTheme, DiscordCommonTheme } from './common';

export interface DiscordTheme extends DiscordColorPalette, DiscordCommonTheme {
    appearance: DiscordAppearance;
}

export const DefaultDiscordTheme: DiscordTheme = {
    ...DefaultDiscordCommonTheme,
    ...DiscordDarkPalette,
    appearance: DefaultDiscordAppearance
};

export const buildDiscordTheme = (appearance: Partial<DiscordAppearance>): DiscordTheme => ({
    ...DefaultDiscordCommonTheme,
    ...(appearance.color === 'dark' ? DiscordDarkPalette : DiscordLightPalette),
    appearance: {
        ...DefaultDiscordAppearance,
        ...appearance
    }
});
