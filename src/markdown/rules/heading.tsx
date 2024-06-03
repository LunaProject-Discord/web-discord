import React from 'react';
import { defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';
import { HeadingOne, HeadingThree, HeadingTwo } from '../styles';

const BEGINNING_OF_LINE_RE = /^$|\n *$/;
const HEADING_RE = /^ *(#{1,3})(?!#) +([^\n]+)\n*/;

export const heading: MarkdownRule = {
    ...defaultRules.heading,
    match: (source, state) => {
        const { nested, inHeading, prevCapture: lookbehind } = state;

        // Prevents having multiple layers of quote blocks
        if (nested || inHeading) return null;

        // Makes sure that quotes can only start on the beginning of a line
        if (!BEGINNING_OF_LINE_RE.test(lookbehind?.[0] ?? '')) return null;

        return HEADING_RE.exec(source);
    },
    parse: (capture, parse, state) => {
        const parsedContent = parse(
            capture[2].trim(),
            {
                ...state,
                inline: true,
                inHeading: true
            }
        );

        if (parsedContent.length === 0)
            parsedContent.push({ type: 'text', content: ' ' });

        return {
            level: capture[1].length,
            content: parsedContent
        };
    },
    react: (node, output, state) => {
        const children = output(node.content, state);
        switch (node.level) {
            case 1:
                return (<HeadingOne key={state.key}>{children}</HeadingOne>);
            case 2:
                return (<HeadingTwo key={state.key}>{children}</HeadingTwo>);
            case 3:
                return (<HeadingThree key={state.key}>{children}</HeadingThree>);
        }
    }
};
