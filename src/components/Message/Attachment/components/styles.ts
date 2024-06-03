import styled from '@emotion/styled';
import { ellipsis, em } from 'polished';
import { DiscordDarkPalette } from '../../../../styles';

export const AttachmentContainer = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 520,
    padding: 10,
    display: 'flex',
    alignItems: 'center',
    background: theme.background.secondary,
    border: `solid 1px ${theme.background.secondaryAlt}`,
    borderRadius: 3
}));

export const AttachmentIconContainer = styled('div')({
    width: 30,
    height: 40,
    marginRight: 8,
    display: 'flex',
    placeItems: 'center',
    placeContent: 'center'
});

export const AttachmentInfo = styled('div')({
    flex: 1,
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden'
});

export const AttachmentFileName = styled('div')({
    ...ellipsis(),
    display: 'block',
    lineHeight: em(16)
});

export const AttachmentFileNameInner = styled('span')(({ theme }) => ({
    color: theme.text.link,
    cursor: 'pointer',
    '&:hover': {
        textDecoration: 'underline'
    }
}));

export const AttachmentFileSize = styled('div')({
    color: DiscordDarkPalette.text.muted,
    fontSize: 12,
    fontWeight: 300,
    lineHeight: em(21 + 1 / 3)
});

export const AttachmentDownloadButton = styled('div')(({ theme }) => ({
    color: theme.interactive.normal,
    cursor: 'pointer',
    '&:hover': {
        color: theme.interactive.hover
    },
    '& > svg': {
        fill: 'currentColor'
    }
}));
