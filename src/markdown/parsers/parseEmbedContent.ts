import {
    autolink,
    blockQuote,
    codeBlock,
    customEmoji,
    emoji,
    emote,
    emphasis,
    escape,
    heading,
    inlineCode,
    lineBreak,
    link,
    list,
    mention,
    newline,
    paragraph,
    spoiler,
    strikethrough,
    strong,
    text,
    underline,
    url
} from '../rules';
import { createParser } from './createParser';

const RULES = {
    autolink,
    blockQuote,
    codeBlock,
    customEmoji,
    emoji,
    emote,
    emphasis,
    escape,
    inlineCode,
    lineBreak,
    link,
    mention,
    newline,
    paragraph,
    spoiler,
    strikethrough,
    strong,
    text,
    underline,
    url
};

export const parseEmbedContent = createParser(RULES);

export const parseEmbedDescription = createParser({ ...RULES, heading, list });
