import {
    autolink,
    blockQuote,
    customEmoji,
    emoji,
    emote,
    emphasis,
    escape,
    inlineCode,
    spoiler,
    strikethrough,
    strong,
    text,
    underline,
    url
} from '../rules';
import { createParser } from './createParser';

export const parseEmbedHeader = createParser({
    autolink,
    blockQuote,
    customEmoji,
    emoji,
    emote,
    emphasis,
    escape,
    inlineCode,
    spoiler,
    strikethrough,
    strong,
    text,
    underline,
    url
});
