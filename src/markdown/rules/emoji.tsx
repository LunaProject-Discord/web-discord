import React from 'react';
import { defaultRules } from 'simple-markdown';
import { getEmojiUrl, NAME_TO_EMOJI } from '../emoji';
import type { MarkdownRule } from '../parsers';
import { Emoji } from '../styles';

const PLAINTEXT_EMOJIS = new Set(['™', '™️', '©', '©️', '®', '®️']);

const EMOJI_NAME_RE = /^:([^\s:]+?(?:::skin-tone-\d)?):/;

export const emoji: MarkdownRule = {
    ...defaultRules.text,
    match: (content) => {
        const match = EMOJI_NAME_RE.exec(content);
        if (!match)
            return null;

        const [, name] = match;

        if (NAME_TO_EMOJI.get(name))
            return match;

        return null;
    },
    parse: ([content, name]) => {
        const em = NAME_TO_EMOJI.get(name);

        if (!em || PLAINTEXT_EMOJIS.has(em))
            return { type: 'text', content };

        const url = getEmojiUrl(em);
        return { name, emoji: em, src: url };
    },
    react: (node, _, state) => (
        <Emoji
            key={state.key}
            src={node.src}
            alt={node.emoji}
            title={node.name}
            draggable={false}
            big={node.jumboable}
        />
    )
};
