import { defaultRules } from 'simple-markdown';
import { convertEmojiToNames } from '../emoji';
import type { MarkdownRule } from '../parsers';

export const text: MarkdownRule = {
    ...defaultRules.text,
    parse: (capture, parse, state) => {
        const [content] = capture;
        const { nested } = state;

        if (nested) {
            return {
                content
            };
        }

        return parse(convertEmojiToNames(content), {
            ...state,
            nested: true
        });
    }
};
