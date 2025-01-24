import styled from '@emotion/styled';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import React, { ComponentProps } from 'react';

export const richEmbedContainerClasses = generateComponentClasses(
    'RichEmbedContainer',
    [
        'root'
    ]
);

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
