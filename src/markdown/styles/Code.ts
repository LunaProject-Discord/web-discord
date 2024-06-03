import styled from '@emotion/styled';
import { em, rem } from 'polished';
import { RichEmbedContainer } from '../../components';

export const Code = styled('code')(({ theme }) => ({
    margin: `${em(-3.2)} 0`,
    padding: em(3.2),
    fontSize: em(13.6),
    lineHeight: rem(18),
    whiteSpace: 'pre-wrap',
    background: theme.background.secondary,
    borderRadius: 3,
    [`${RichEmbedContainer} &&, .RichEmbedContainer-root &&`]: {
        background: theme.background.tertiary
    }
}));
