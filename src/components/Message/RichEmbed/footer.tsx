import styled from '@emotion/styled';
import { formatTimestamp, generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import { isValid } from 'date-fns/isValid';
import { rem, size } from 'polished';
import React, { ComponentProps } from 'react';
import { Embed } from '../../../interfaces';

export const richEmbedFooterClasses = generateComponentClasses(
    'RichEmbedFooter',
    [
        'root',
        'icon',
        'text',
        'separator',
        'timestamp'
    ]
);

export const RichEmbedFooterRoot = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedFooterClasses.root, className)}
            {...props}
        />
    )
)<ComponentProps<'div'> & { thumbnail?: boolean; }>(({ thumbnail }) => ({
    minWidth: 0,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    gridRow: 'auto / auto',
    gridColumn: '1 / 2',
    ...(thumbnail && {
        gridColumn: '1 / 3'
    })
}));

export const RichEmbedFooterIcon = styled(
    ({ className, ...props }: ComponentProps<'img'>) => (
        <img
            className={clsx(richEmbedFooterClasses.icon, className)}
            {...props}
        />
    )
)<ComponentProps<'img'>>({
    ...size(20),
    marginRight: 8,
    objectFit: 'contain',
    borderRadius: '50%'
});

export const RichEmbedFooterText = styled(
    ({ className, ...props }: ComponentProps<'span'>) => (
        <span
            className={clsx(richEmbedFooterClasses.text, className)}
            {...props}
        />
    )
)<ComponentProps<'span'>>(({ theme }) => ({
    color: theme.text.normal,
    fontSize: rem(12),
    fontWeight: 500,
    lineHeight: rem(16),
    whiteSpace: 'break-spaces',
    ...(theme.appearance.color === 'light' && {
        '@media (max-resolution: 1dppx)': {
            fontWeight: 500
        }
    })
}));

export const RichEmbedFooterSeparator = styled(
    ({ className, ...props }: ComponentProps<'span'>) => (
        <span
            className={clsx(richEmbedFooterClasses.separator, className)}
            {...props}
        />
    )
)<ComponentProps<'span'>>({
    margin: '0 4px',
    display: 'inline-block'
});

export interface RichEmbedFooterProps {
    embed: Embed;
}

export const RichEmbedFooter = ({ embed: { image, footer: { text, iconUrl }, timestamp } }: RichEmbedFooterProps) => (
    <RichEmbedFooterRoot thumbnail={Boolean(image?.thumbnail)}>
        {iconUrl && <RichEmbedFooterIcon src={iconUrl} alt="Footer icon" />}
        <RichEmbedFooterText>
            {text}
            {text && timestamp && isValid(timestamp) && <RichEmbedFooterSeparator>•</RichEmbedFooterSeparator>}
            {timestamp && isValid(timestamp) &&
                <span className={richEmbedFooterClasses.timestamp}>{formatTimestamp(timestamp)}</span>
            }
        </RichEmbedFooterText>
    </RichEmbedFooterRoot>
);
