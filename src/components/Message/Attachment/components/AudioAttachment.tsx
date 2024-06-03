import styled from '@emotion/styled';
import React from 'react';
import { getAttachmentIcon, getHumanReadableSize } from '../helpers';
import { download } from '../icons';
import { AudioControls } from './AudioControls';
import { AttachmentContainer, AttachmentDownloadButton, AttachmentIconContainer } from './styles';

const AudioContainer = styled(AttachmentContainer)({
    width: 400,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-between'
});

const AudioMetadata = styled('div')({
    display: 'flex'
});

const AudioIconContainer = styled(AttachmentIconContainer)({
    width: 26,
    height: 40,
    margin: '-4px 1px 0 -1px',
    '& > svg': {
        width: 26,
        height: 40
    }
});

const AudioAttachmentInfo = styled('div')({
    padding: '0 8px',
    flex: '1 1 auto',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
});

const AudioFileName = styled('span')(({ theme }) => ({
    color: theme.text.link,
    fontSize: 16,
    fontWeight: 500,
    lineHeight: '20px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    '&:hover': {
        textDecoration: 'underline'
    }
}));

const AudioFileSize = styled('div')(({ theme }) => ({
    color: theme.text.muted,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: '16px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    opacity: .7
}));

const AudioDownloadButton = styled(AttachmentDownloadButton)({
    flex: 0,
    '& > svg': {
        height: 25
    }
});

export interface AudioAttachmentProps {
    file: File;
}

export const AudioAttachment = ({ file: { name, size } }: AudioAttachmentProps) => (
    <AudioContainer>
        <AudioMetadata>
            <AudioIconContainer>{getAttachmentIcon('audio')}</AudioIconContainer>
            <AudioAttachmentInfo>
                <AudioFileName>{name}</AudioFileName>
                <AudioFileSize>{getHumanReadableSize(size)}</AudioFileSize>
            </AudioAttachmentInfo>
            <AudioDownloadButton>{download}</AudioDownloadButton>
        </AudioMetadata>
        <AudioControls />
    </AudioContainer>
);
