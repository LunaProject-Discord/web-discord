import styled from '@emotion/styled';

export const MessageContainer = styled('div')(({ theme }) => ({
    padding: '16px 0',
    color: theme.text.normal,
    fontFamily: theme.font.sans,
    fontSize: theme.appearance.fontSize,
    background: theme.background.primary,
    border: 'solid 1px rgba(0, 0, 0, .12)',
    borderRadius: 4,
    'pre, code': {
        fontFamily: theme.font.mono,
        '*': {
            fontFamily: 'inherit'
        }
    },
    'a': {
        color: theme.text.link,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    'img': {
        textIndent: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    }
}));
