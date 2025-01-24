import styled from '@emotion/styled';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import { size } from 'polished';
import React, { ComponentProps } from 'react';
import { Embed } from '../../../interfaces';

export const richEmbedGalleryClasses = generateComponentClasses(
    'RichEmbedGallery',
    [
        'root',
        'cell',
        'image'
    ]
);

export const RichEmbedGalleryRoot = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedGalleryClasses.root, className)}
            {...props}
        />
    )
)<ComponentProps<'div'> & { thumbnail?: boolean; }>(({ thumbnail }) => ({
    height: 300,
    marginTop: 16,
    gridColumn: '1 / 2',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: '1fr 1fr',
    gap: 4,
    overflow: 'hidden',
    borderRadius: 4,
    ...(thumbnail && {
        gridColumn: '1 / 3'
    })
}));

export const RichEmbedGalleryCell = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedGalleryClasses.cell, className)}
            {...props}
        />
    )
)<ComponentProps<'div'> & { index?: number; length?: number; }>(({ index, length }) => ({
    minWidth: '100%',
    minHeight: '100%',
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center',
    ...((length === 1 || length === 2 || (length === 3 && index === 0)) && {
        gridRow: 'span 2'
    })
}));

export const RichEmbedGalleryImage = styled(
    ({ className, ...props }: ComponentProps<'img'>) => (
        <img
            className={clsx(richEmbedGalleryClasses.image, className)}
            {...props}
        />
    )
)<ComponentProps<'img'>>({
    ...size('100%'),
    objectFit: 'cover'
});

export interface RichEmbedGalleryProps {
    embed: Embed;
}

export const RichEmbedGallery = ({ embed: { image: { images, thumbnail } } }: RichEmbedGalleryProps) => (
    <RichEmbedGalleryRoot thumbnail={Boolean(thumbnail)}>
        {(images ?? []).map((url, index) => (
            <RichEmbedGalleryCell key={`${index}-${url}`} index={index} length={images.length}>
                <RichEmbedGalleryImage src={url} alt="Image" />
            </RichEmbedGalleryCell>
        ))}
    </RichEmbedGalleryRoot>
);
