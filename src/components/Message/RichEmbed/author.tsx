import styled from '@emotion/styled';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import { rem, size } from 'polished';
import React, { ComponentProps } from 'react';
import { Embed } from '../../../interfaces';

export const richEmbedAuthorClasses = generateComponentClasses(
    'RichEmbedAuthor',
    [
        'root',
        'icon',
        'name',
        'nameLink'
    ]
);

export const RichEmbedAuthorRoot = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedAuthorClasses.root, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>({
    minWidth: 0,
    marginTop: 8,
    gridColumn: '1 / 2',
    display: 'flex',
    alignItems: 'center'
});

export const RichEmbedAuthorIcon = styled(
    ({ className, ...props }: ComponentProps<'img'>) => (
        <img
            className={clsx(richEmbedAuthorClasses.icon, className)}
            {...props}
        />
    )
)<ComponentProps<'img'>>({
    ...size(24),
    marginRight: 8,
    objectFit: 'contain',
    borderRadius: '50%'
});

export const RichEmbedAuthorNameNormal = styled(
    ({ className, ...props }: ComponentProps<'span'>) => (
        <span
            className={clsx(richEmbedAuthorClasses.name, className)}
            {...props}
        />
    )
)<ComponentProps<'span'>>(({ theme }) => ({
    display: 'inline-block',
    color: theme.header.primary,
    fontSize: rem(14),
    fontWeight: 600,
    whiteSpace: 'pre-wrap',
    '@media (max-resolution: 1dppx)': {
        fontWeight: 500
    }
}));

export const RichEmbedAuthorNameLink = styled(
    ({ className, ...props }: ComponentProps<'a'>) => {
        const Component = RichEmbedAuthorNameNormal.withComponent('a');
        return (
            <Component
                className={clsx(richEmbedAuthorClasses.nameLink, className)}
                {...props}
            />
        );
    }
)<ComponentProps<'a'>>({
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    }
});

export interface RichEmbedAuthorProps {
    embed: Embed;
}

export const RichEmbedAuthor = ({ embed: { author: { name, url, iconUrl } } }: RichEmbedAuthorProps) => (
    <RichEmbedAuthorRoot>
        {iconUrl && <RichEmbedAuthorIcon src={iconUrl} alt="Author icon" />}
        {name && (url ? <RichEmbedAuthorNameLink
            href={url}
            target="_blank"
            rel="noopener noreferrer nofollow ugc"
        >
            {name}
        </RichEmbedAuthorNameLink> : <RichEmbedAuthorNameNormal>
            {name}
        </RichEmbedAuthorNameNormal>)}
    </RichEmbedAuthorRoot>
);
