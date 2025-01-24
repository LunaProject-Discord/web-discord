import '@emotion/react';
import { DiscordTheme as DiscordTheme } from '../styles';

declare module '@emotion/react' {
    interface Theme extends DiscordTheme {

    }
}
