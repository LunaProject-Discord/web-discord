import styled from '@emotion/styled';
import { transparentize } from 'polished';

export const Spoiler = styled('span')(({ theme }) => ({
    background: transparentize(.9, theme.appearance.color === 'dark' ? 'white' : 'black'),
    borderRadius: 3
}));
