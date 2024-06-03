import React, { Fragment } from 'react';
import { ASTNode, defaultRules } from 'simple-markdown';
import type { MarkdownRule } from '../parsers';
import { ListItem, OrderedList, UnorderedList } from '../styles';

const LIST_BULLET = '(?:[*+-]|\\d+\\.)';
const LIST_ITEM_PREFIX = `( *)(${LIST_BULLET}) +`;
const LIST_ITEM_PREFIX_R = new RegExp(`^${LIST_ITEM_PREFIX}`);
const LIST_ITEM_R = new RegExp(
    LIST_ITEM_PREFIX +
    '[^\\n]*(?:\\n' +
    `(?!\\1${LIST_BULLET} )[^\\n]*)*(\n|$)`,
    'gm'
);
const LIST_BLOCK_END = '\\n{1,}';
const LIST_BLOCK_END_R = new RegExp(`${LIST_BLOCK_END}$`);
const LIST_ITEM_END_R = / *\n+$/;
const LIST_R = new RegExp(
    `^( *)(${LIST_BULLET}) ` +
    `[\\s\\S]+?(?:${LIST_BLOCK_END}(?! )` +
    `(?!\\1${LIST_BULLET} )\\n*` +
    '|\\s*\n*$)'
);
const LIST_LOOKBEHIND_R = /(?:^|\n)( *)$/;

export const list: MarkdownRule = {
    ...defaultRules.list,
    match: (source, state, prevCapture) => {
        state._list = true;

        const prevCaptureStr = state.prevCapture == null ? '' : state.prevCapture[0];
        const isStartOfLineCapture = LIST_LOOKBEHIND_R.exec(prevCaptureStr);
        const isListBlock = state._list || !state.inline;

        if (isStartOfLineCapture && isListBlock) {
            source = isStartOfLineCapture[1] + source;
            return LIST_R.exec(source);
        } else {
            return null;
        }
    },
    parse: (capture, parse, state) => {
        const bullet = capture[2];
        const ordered = bullet.length > 1;
        const start = ordered ? +bullet : undefined;
        const items = capture[0]
            .replace(LIST_BLOCK_END_R, '\n')
            .match(LIST_ITEM_R) as string[];

        let shallow = false;
        const itemContent = items.map((item, i) => {
            const prefixCapture = LIST_ITEM_PREFIX_R.exec(item);
            const space = prefixCapture ? prefixCapture[0].length : 0;
            const spaceRegex = new RegExp(`^ {1,${space}}`, 'gm');

            const content = item
                .replace(spaceRegex, '')
                .replace(LIST_ITEM_PREFIX_R, '');

            shallow = space < 3;

            const oldStateInline = state.inline;
            const oldStateList = state._list;
            state._list = true;
            state.inline = true;

            const result = parse(content.replace(LIST_ITEM_END_R, ''), state);

            state.inline = oldStateInline;
            state._list = oldStateList;
            return result;
        });

        return {
            shallow: shallow,
            ordered: ordered,
            start: start,
            items: itemContent
        };
    },
    react: (node, output, state) => {
        const items: ASTNode[] = node.items;

        const children = (
            <Fragment>
                {items.map((item, i) => (
                    <ListItem key={i}>{output(item, state)}</ListItem>
                ))}
            </Fragment>
        );

        if (node.ordered) {
            const start: number = node.start;

            return (
                <OrderedList
                    key={state.key}
                    start={start}
                    style={{ ['--totalCharacters' as any]: (start + items.length).toString().length }}
                >
                    {children}
                </OrderedList>
            );
        } else {
            return (<UnorderedList key={state.key}>{children}</UnorderedList>);
        }
    }
};
