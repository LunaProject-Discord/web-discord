import React, { memo } from 'react';
import { PARSERS } from './parsers';
import { MarkdownContainer } from './styles';

export interface MarkdownProps {
    className?: string;
    content: string;
    type?: keyof typeof PARSERS;
}

const MarkdownRenderer = ({ className, content, type = 'default' }: MarkdownProps) => {
    const parse = PARSERS[type];

    return (
        <MarkdownContainer className={className}>
            {parse(content.trim())}
        </MarkdownContainer>
    );
};

export const Markdown = memo(MarkdownRenderer);

export * from './code';
export * from './emoji';
export * from './helpers';
export * from './parsers';
export * from './rules';
export * from './styles';
