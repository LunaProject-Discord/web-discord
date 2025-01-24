import styled from '@emotion/styled';
import { em, rem } from 'polished';

export const CodeBlockContainer = styled.pre`
    max-width: 90%;
    margin-top: 6px;
    padding: ${em(8)};
    color: ${({ theme }) => theme.header.secondary};
    font-family: 'HackGen', SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace;
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    white-space: pre-wrap;
    background: ${({ theme }) => theme.background.secondary};
    border: solid 1px ${({ theme }) => theme.background.tertiary};
    border-radius: 4px;

    .RichEmbedContainer-root && {
        max-width: 100%;
        background: ${({ theme }) => theme.background.tertiary};
        border: none;
    }

    & .hljs-comment,
    & .hljs-quote {
        color: ${({ theme }) => theme.interactive.muted};
    }

    & .hljs-addition,
    & .hljs-keyword,
    & .hljs-selector-tag {
        color: #859900;
    }

    & .hljs-doctag,
    & .hljs-literal,
    & .hljs-meta .hljs-meta-string,
    & .hljs-number,
    & .hljs-regexp,
    & .hljs-string {
        color: #2aa198;
    }

    & .hljs-name,
    & .hljs-section,
    & .hljs-selector-class,
    & .hljs-selector-id,
    & .hljs-title {
        color: #268bd2;
    }

    & .hljs-attr,
    & .hljs-attribute,
    & .hljs-class .hljs-title,
    & .hljs-template-variable,
    & .hljs-type,
    & .hljs-variable {
        color: #b58900;
    }

    & .hljs-bullet,
    & .hljs-link,
    & .hljs-meta,
    & .hljs-meta .hljs-keyword,
    & .hljs-selector-attr,
    & .hljs-selector-pseudo,
    & .hljs-subst,
    & .hljs-symbol {
        color: #cb4b16;
    }

    & .hljs-built_in,
    & .hljs-deletion {
        color: #dc322f;
    }

    & .hljs-formula {
        background: #073642;
    }

    & .hljs-emphasis {
        font-style: italic;
    }

    & .hljs-strong {
        font-weight: 700;
    }
`;
