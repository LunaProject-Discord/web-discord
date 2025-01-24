import styled from '@emotion/styled';
import React, { ReactNode } from 'react';

const BlockQuoteContainer = styled('div')({
    display: 'flex'
});

const BlockQuoteDivider = styled('div')(({ theme }) => ({
    minWidth: 4,
    maxWidth: 4,
    background: theme.interactive.muted,
    borderRadius: 4
}));

const BlockQuoteContent = styled('blockquote')({
    maxWidth: '90%',
    margin: 0,
    paddingLeft: 12,
    paddingRight: 8,
    textIndent: 0,
    [`.RichEmbedContainer-root &`]: {
        maxWidth: '100%'
    }
});

export interface BlockQuoteProps {
    children: ReactNode;
}

export const BlockQuote = ({ children }: BlockQuoteProps) => (
    <BlockQuoteContainer>
        <BlockQuoteDivider />
        <BlockQuoteContent>{children}</BlockQuoteContent>
    </BlockQuoteContainer>
);
