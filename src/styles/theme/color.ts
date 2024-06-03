import { rgb, rgba } from 'polished';
import { DefaultDiscordCommonTheme } from './common';

export interface DiscordColorPalette {
    accent: {
        primary: string;
        warning: string;
        danger: string;
    };
    background: {
        primary: string;
        secondary: string;
        secondaryAlt: string;
        tertiary: string;
        accent: string;
        floating: string;
    };
    backgroundModifier: {
        hover: string;
        active: string;
        selected: string;
        accent: string;
    };
    elavation: {
        stroke: string;
        low: string;
        medium: string;
        high: string;
    };
    header: {
        primary: string;
        secondary: string;
    };
    interactive: {
        normal: string;
        hover: string;
        active: string;
        muted: string;
    };
    scrollbar: {
        auto: {
            thumb: string;
            track: string;
        };
        thin: {
            thumb: string;
            track: string;
        };
    };
    text: {
        normal: string;
        muted: string;
        link: string;
    };
}

export const DiscordDarkPalette: DiscordColorPalette = {
    accent: {
        primary: DefaultDiscordCommonTheme.discord.primary,
        warning: rgb(255, 217, 83),
        danger: rgb(255, 122, 107)
    },
    background: {
        primary: rgb(54, 57, 63),
        secondary: rgb(47, 49, 54),
        secondaryAlt: rgb(41, 43, 47),
        tertiary: rgb(32, 34, 37),
        accent: rgb(79, 84, 92),
        floating: rgb(24, 25, 28)
    },
    backgroundModifier: {
        hover: rgba(79, 84, 92, 0.16),
        active: rgba(79, 84, 92, 0.24),
        selected: rgba(79, 84, 92, 0.32),
        accent: rgba(255, 255, 255, 0.06)
    },
    elavation: {
        stroke: `0 0 0 1px ${rgba(4, 4, 5, 0.15)}`,
        low: [
            `0 1px 0 ${rgba(4, 4, 5, 0.2)}`,
            `0 1.5px 0 ${rgba(6, 6, 7, 0.05)}`,
            `0 2px 0 ${rgba(4, 4, 5, 0.05)}`
        ].join(','),
        medium: `0 4px 4px ${rgba(0, 0, 0, 0.16)}`,
        high: `0 8px 16px ${rgba(0, 0, 0, 0.24)}`
    },
    header: {
        primary: rgb(255, 255, 255),
        secondary: rgb(185, 187, 190)
    },
    interactive: {
        normal: rgb(185, 187, 190),
        hover: rgb(220, 221, 222),
        active: rgb(255, 255, 255),
        muted: rgb(79, 84, 92)
    },
    scrollbar: {
        auto: {
            thumb: rgb(32, 34, 37),
            track: rgb(46, 51, 56)
        },
        thin: {
            thumb: rgb(32, 34, 37),
            track: rgba(0, 0, 0, 0)
        }
    },
    text: {
        normal: rgb(220, 221, 222),
        muted: rgb(114, 118, 125),
        link: rgb(0, 176, 244)
    }
};

export const DiscordLightPalette: DiscordColorPalette = {
    accent: {
        primary: DefaultDiscordCommonTheme.discord.primary,
        warning: rgb(204, 77, 0),
        danger: rgb(217, 47, 47)
    },
    background: {
        primary: rgb(255, 255, 255),
        secondary: rgb(242, 243, 245),
        secondaryAlt: rgb(235, 237, 239),
        tertiary: rgb(227, 229, 232),
        accent: rgb(116, 127, 141),
        floating: rgb(255, 255, 255)
    },
    backgroundModifier: {
        hover: rgba(116, 127, 141, 0.08),
        active: rgba(116, 127, 141, 0.16),
        selected: rgba(116, 127, 141, 0.24),
        accent: rgba(6, 6, 7, 0.08)
    },
    elavation: {
        stroke: `0 0 0 1px ${rgba(6, 6, 7, 0.08)}`,
        low: [
            `0 1px 0 ${rgba(6, 6, 7, 0.1)}`,
            `0 1.5px 0 ${rgba(6, 6, 7, 0.025)}`,
            `0 2px 0 ${rgba(6, 6, 7, 0.025)}`
        ].join(','),
        medium: `0 4px 4px ${rgba(0, 0, 0, 0.08)}`,
        high: `0 8px 16px ${rgba(0, 0, 0, 0.16)}`
    },
    header: {
        primary: rgb(6, 6, 7),
        secondary: rgb(79, 86, 96)
    },
    interactive: {
        normal: rgb(79, 86, 96),
        hover: rgb(46, 51, 56),
        active: rgb(6, 6, 7),
        muted: rgb(199, 204, 209)
    },
    scrollbar: {
        auto: {
            thumb: rgb(204, 204, 204),
            track: rgb(242, 242, 242)
        },
        thin: {
            thumb: rgba(79, 84, 92, 0.3),
            track: rgba(0, 0, 0, 0)
        }
    },
    text: {
        normal: rgb(46, 51, 56),
        muted: rgb(116, 127, 141),
        link: rgb(0, 103, 224)
    }
};

