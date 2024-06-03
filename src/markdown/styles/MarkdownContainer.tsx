import styled from '@emotion/styled';
import clsx from 'clsx';
import React, { ComponentProps } from 'react';

const markdownContainerClassPrefix = 'MarkdownContainer';
export const markdownContainerClasses = {
    root: `${markdownContainerClassPrefix}-root`
};

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
