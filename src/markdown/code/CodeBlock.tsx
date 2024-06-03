import hljs from 'highlight.js/lib/core';
import React, { useEffect, useState } from 'react';
import { CodeBlockContainer } from '../styles';
import { getLanguageFromAlias } from './getLanguageFromAlias';
import { highlightCode } from './highlightCode';

export type CodeBlockProps = {
    content: string
    language?: string
};

export function CodeBlock(props: CodeBlockProps) {
    const { content, language = '' } = props;

    const [html, setHtml] = useState('');
    useEffect(() => {
        highlightCode(language, content)
            .then((value) => setHtml(value ?? ''))
            .catch(() => setHtml(''));
    }, [content, language]);

    if (typeof window === 'undefined') {
        const safeLanguage = getLanguageFromAlias(language)?.name ?? 'plaintext';

        return (
            <CodeBlockContainer
                dangerouslySetInnerHTML={{
                    __html: hljs.highlight(safeLanguage, content).value
                }}
            />
        );
    }

    if (!html) {
        return <CodeBlockContainer>{content}</CodeBlockContainer>;
    }

    return (
        <CodeBlockContainer
            dangerouslySetInnerHTML={{
                __html: html
            }}
        />
    );
}
