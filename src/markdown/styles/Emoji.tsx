import styled from '@emotion/styled';
import { em, rem, size } from 'polished';
import { ComponentPropsWithoutRef } from 'react';
import { RichEmbedContainer } from '../../components';
import React from 'react';

const Emoji = styled(
    ({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) => (
        <img
            src={src}
            alt={alt}
            draggable={false}
            {...props}
        />
    )
)<{ big?: boolean }>(({ theme, big }) => ({
    display: 'inline',
    ...size(em(22)),
    objectFit: 'contain',
    verticalAlign: 'bottom',
    ...(theme.appearance.display === 'cozy' && big && {
        ...size(rem(48)),
        minHeight: rem(48)
    }),
    [`${RichEmbedContainer} &, .RichEmbedContainer-root &`]: {
        ...size(18)
    }
}));

export { Emoji };
