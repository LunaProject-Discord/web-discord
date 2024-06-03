import { jumbosizeEmojis } from '../emoji';
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

export const parseMessageContent = createParser(
    {
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
    },
    jumbosizeEmojis
);
