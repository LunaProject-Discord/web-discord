import styled from '@emotion/styled';
import { size, transparentize } from 'polished';
import React from 'react';
import { DiscordDarkPalette } from '../../../../styles';
import { play, volume } from '../icons';

const AudioControlsContainer = styled('div')({
    height: 32,
    marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    background: transparentize(.4, 'black'),
    borderRadius: 3
});

const AudioDuration = styled('div')(({ theme }) => ({
    margin: 4,
    display: 'flex',
    color: DiscordDarkPalette.header.primary,
    fontFamily: theme.font.mono,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 12
}));

const AudioDurationSeparator = styled('span')({
    margin: '0 2px'
});

const AudioSeekbarContainer = styled('div')({
    height: 32,
    margin: 4,
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    cursor: 'pointer'
});

const AudioSeekbar = styled('div')({
    ...size(6, '100%'),
    background: transparentize(.7, DiscordDarkPalette.interactive.normal),
    borderRadius: 3
});

const AudioSeekbarHandle = styled('div')(({ theme }) => ({
    ...size(6),
    background: theme.discord.primary,
    borderRadius: 3
}));

const AudioControlButton = styled('div')({
    ...size(24),
    margin: 4,
    color: 'white',
    opacity: .6,
    '&:hover': {
        opacity: 1
    },
    '& > svg': {
        fill: 'currentColor'
    }
});

export const AudioControls = () => (
    <AudioControlsContainer>
        <AudioControlButton>{play}</AudioControlButton>
        <AudioDuration>
            -:--
            <AudioDurationSeparator>/</AudioDurationSeparator>
            -:--
        </AudioDuration>
        <AudioSeekbarContainer>
            <AudioSeekbar>
                <AudioSeekbarHandle />
            </AudioSeekbar>
        </AudioSeekbarContainer>
        <AudioControlButton>{volume}</AudioControlButton>
    </AudioControlsContainer>
);
