import React from 'react';
import { defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';
import { Code } from '../styles';

export const inlineCode: MarkdownRule = {
    ...defaultRules.inlineCode,
    react: (node, output, state) => <Code key={state.key}>{node.content}</Code>
};
