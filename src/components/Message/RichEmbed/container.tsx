import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentProps } from 'react';

const richEmbedContainerClassPrefix = 'RichEmbedContainer';
export const richEmbedContainerClasses = {
    root: `${richEmbedContainerClassPrefix}-root`
};

export const RichEmbedContainer = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedContainerClasses.root, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>(({ theme }) => ({
    maxWidth: 520,
    display: 'grid',
    background: theme.background.secondary,
    borderLeft: `solid 4px ${theme.background.tertiary}`,
    borderRadius: 4,
    '&, & *': {
        unicodeBidi: 'plaintext',
        textAlign: 'left'
    }
}));
