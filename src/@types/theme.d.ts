import '@emotion/react';
import { DiscordTheme as DiscordTheme } from '../styles';

declare module '@emotion/react' {
    // tslint:disable-next-line:no-empty-interface
    interface Theme extends DiscordTheme {

    }
}
