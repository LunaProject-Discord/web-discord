import styled from '@emotion/styled';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import Color from 'color';
import { isValid } from 'date-fns/isValid';
import { rem } from 'polished';
import React, { ComponentProps, useEffect, useRef } from 'react';
import { Embed } from '../../../interfaces';
import { Markdown, markdownContainerClasses } from '../../../markdown';
import { RichEmbedAuthor } from './author';
import { RichEmbedContainer } from './container';
import { RichEmbedField } from './field';
import { RichEmbedFooter } from './footer';
import { RichEmbedGallery } from './gallery';

export const richEmbedClasses = generateComponentClasses(
    'RichEmbed',
    [
        'root',
        'titleRoot',
        'title',
        'titleLinkRoot',
        'titleLink',
        'descriptionRoot',
        'description',
        'fields',
        'image',
        'thumbnailRoot',
        'thumbnail'
    ]
);

export const RichEmbedRoot = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedClasses.root, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>({
    padding: `${rem(8)} ${rem(16)} ${rem(16)} ${rem(12)}`,
    display: 'inline-grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto'
});

export const RichEmbedTitleNormal = styled(
    ({ className, ...props }: ComponentProps<'span'>) => (
        <span
            className={clsx(richEmbedClasses.titleRoot, className)}
            {...props}
        />
    )
)<ComponentProps<'span'>>(({ theme }) => ({
    minWidth: 0,
    marginTop: 8,
    display: 'inline-block',
    gridColumn: '1 / 2',
    [`& .${markdownContainerClasses.root}, & .${richEmbedClasses.title}`]: {
        fontSize: rem(16),
        fontWeight: 600,
        color: theme.header.primary
    }
}));

export const RichEmbedTitleLink = styled(
    ({ className, ...props }: ComponentProps<'a'>) => {
        const Component = RichEmbedTitleNormal.withComponent('a');
        return (
            <Component
                className={clsx(richEmbedClasses.titleLinkRoot, className)}
                {...props}
            />
        );
    }
)<ComponentProps<'a'>>(({ theme }) => ({
    textDecoration: 'none',
    '&:hover': {
        textDecoration: 'underline'
    },
    [`& .${markdownContainerClasses.root}, & .${richEmbedClasses.titleLink}`]: {
        color: theme.text.link
    }
}));

export const RichEmbedDescription = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedClasses.descriptionRoot, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>(({ theme }) => ({
    minWidth: 0,
    marginTop: 8,
    gridColumn: '1 / 2',
    [`& .${markdownContainerClasses.root}, & .${richEmbedClasses.description}`]: {
        color: theme.text.normal,
        fontSize: rem(14),
        lineHeight: rem(18),
        whiteSpace: 'pre-line'
    }
}));

export const RichEmbedFields = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedClasses.fields, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>({
    minWidth: 0,
    marginTop: 8,
    display: 'grid',
    gridColumn: '1 / 2',
    gap: 8
});

export const RichEmbedImage = styled(
    ({ className, ...props }: ComponentProps<'img'>) => (
        <img
            className={clsx(richEmbedClasses.image, className)}
            {...props}
        />
    )
)<ComponentProps<'img'> & { thumbnail?: boolean; }>(({ thumbnail }) => ({
    width: '100%',
    minWidth: 0,
    maxWidth: 400,
    maxHeight: 300,
    marginTop: 16,
    gridColumn: '1 / 2',
    cursor: 'pointer',
    borderRadius: 4,
    ...(thumbnail && {
        gridColumn: '1 / 3'
    })
}));

export const RichEmbedThumbnailRoot = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedClasses.thumbnailRoot, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>({
    marginTop: 8,
    marginLeft: 16,
    gridRow: '1 / 8',
    gridColumn: '2 / 3',
    justifySelf: 'end',
    cursor: 'pointer'
});

export const RichEmbedThumbnail = styled(
    ({ className, ...props }: ComponentProps<'img'>) => (
        <img
            className={clsx(richEmbedClasses.thumbnail, className)}
            {...props}
        />
    )
)<ComponentProps<'img'>>({
    maxWidth: 80,
    maxHeight: 80,
    borderRadius: 4
});

export interface RichEmbedProps {
    embed: Embed;
}

export const RichEmbed = ({ embed }: RichEmbedProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    const hasTitle = embed.title.trim().length > 0;
    const hasDescription = embed.description.trim().length > 0;
    const hasAuthor = embed.author.name.trim().length > 0;
    const hasFooter = embed.footer.text.trim().length > 0 || isValid(embed.timestamp);

    const embedColor = embed?.color ?? Color(0xffffff);
    const fields = embed.fields ?? [];
    const images = embed.image?.images ?? [];
    const thumbnail = embed.image?.thumbnail;

    useEffect(() => {
        const { current: container } = containerRef;
        if (!container) return;

        container.style.maxWidth = '';
    }, [images.length === 1 && images[0]]);

    const color = embedColor.rgbNumber() === 0xffffff ? undefined : embedColor.hex();

    return (
        <RichEmbedContainer ref={containerRef} style={{ borderColor: color }}>
            <RichEmbedRoot>
                {hasAuthor && <RichEmbedAuthor embed={embed} />}
                {hasTitle && (embed.url ? <RichEmbedTitleLink
                    href={embed.url}
                    target="_blank"
                    rel="noopener noreferrer nofollow ugc"
                >
                    <Markdown content={embed.title} type="embed-header" className={richEmbedClasses.titleLink} />
                </RichEmbedTitleLink> : <RichEmbedTitleNormal>
                    <Markdown content={embed.title} type="embed-header" className={richEmbedClasses.title} />
                </RichEmbedTitleNormal>)}
                {hasDescription && <RichEmbedDescription>
                    <Markdown
                        content={embed.description}
                        type="embed-description"
                        className={richEmbedClasses.description}
                    />
                </RichEmbedDescription>}
                {fields.length > 0 && <RichEmbedFields>
                    {fields.map((field, i) => (
                        <RichEmbedField key={field._id ?? i} field={field} embed={embed} />
                    ))}
                </RichEmbedFields>}
                {images.length > 1 ? (
                    <RichEmbedGallery embed={embed} />
                ) : images.length === 1 ? (
                    <RichEmbedImage
                        ref={imageRef}
                        src={images[0]}
                        alt="Image"
                        thumbnail={Boolean(embed.image?.thumbnail)}
                        onLoad={() => {
                            const { current: container } = containerRef;
                            const { current: image } = imageRef;
                            if (!container || !image) return;

                            const { width } = image.getBoundingClientRect();
                            container.style.maxWidth = width >= 300 ? `${width + 32}px` : '';
                        }}
                    />
                ) : undefined}
                {hasFooter && <RichEmbedFooter embed={embed} />}
                {thumbnail && <RichEmbedThumbnailRoot>
                    <RichEmbedThumbnail src={thumbnail} alt="Thumbnail" />
                </RichEmbedThumbnailRoot>}
            </RichEmbedRoot>
        </RichEmbedContainer>
    );
};

export * from './author';
export * from './container';
export * from './field';
export * from './footer';
export * from './gallery';
