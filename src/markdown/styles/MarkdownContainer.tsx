import styled from '@emotion/styled';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import React, { ComponentProps } from 'react';

export const markdownContainerClasses = generateComponentClasses(
    'MarkdownContainer',
    [
        'root'
    ]
);

export const MarkdownContainer = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(markdownContainerClasses.root, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>(({ theme }) => ({
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    lineHeight: 1.375,
    ...(theme.appearance.color === 'light' && {
        '@media (max-resolution: 1dppx)': {
            fontWeight: 500
        }
    })
}));
