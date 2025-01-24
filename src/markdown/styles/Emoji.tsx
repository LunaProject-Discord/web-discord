import styled from '@emotion/styled';
import { em, rem, size } from 'polished';
import React, { ComponentPropsWithoutRef } from 'react';
import { richEmbedContainerClasses } from '../../components';

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
    [`.${richEmbedContainerClasses.root} &`]: {
        ...size(18)
    }
}));

export { Emoji };
