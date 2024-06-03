import { rgb } from 'polished';

export interface DiscordCommonTheme {
    discord: {
        primary: string;
        success: string;
        warning: string;
        danger: string;
    };
    font: {
        sans: string;
        mono: string;
    };
}

export const DefaultDiscordCommonTheme: DiscordCommonTheme = {
    discord: {
        primary: rgb(88, 101, 242),
        success: rgb(67, 181, 129),
        warning: rgb(250, 166, 26),
        danger: rgb(240, 71, 71)
    },
    font: {
        sans: [
            'Whitney',
            'Helvetica Neue',
            'Helvetica',
            'Arial',
            'sans-serif'
        ].join(),
        mono: [
            'HackGen',
            'SFMono-Regular',
            'Menlo',
            'Monaco',
            'Consolas',
            'Liberation Mono',
            'Courier New',
            'monospace'
        ].join()
    }
};
