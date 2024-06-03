import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { em, rem, size } from 'polished';
import React from 'react';
import { DiscordDarkPalette } from '../../styles';
import type { ClockProps } from './Clock';

const Clock = dynamic<ClockProps>(
    async () => import('./Clock').then(module => module.Clock),
    { ssr: false }
);

const Container = styled('div')(({ theme }) => ({
    ...(theme.appearance.display === 'cozy' && {
        marginLeft: rem(-72),
        paddingLeft: rem(72),
        position: 'relative',
        ...(theme.appearance.fontSize > 16 && {
            marginLeft: -72,
            paddingLeft: 72
        })
    }),
    ...(theme.appearance.display === 'compact' && {
        display: 'contents'
    })
}));

const Avatar = styled('img')(({ theme }) => ({
    ...size(rem(40)),
    margin: `0 ${rem(16)}`,
    position: 'absolute',
    top: rem(2),
    left: 0,
    objectFit: 'cover',
    cursor: 'pointer',
    borderRadius: '50%',
    ...(theme.appearance.fontSize > 16 && {
        ...size(40),
        margin: '0 16px'
    }),
    '@media (max-width: 575.95px)': {
        display: 'none'
    },
    '&:hover': {
        boxShadow: theme.elavation.medium
    },
    '&:active': {
        transform: 'translateY(1px)'
    }
}));

const Username = styled('h1')(({ theme }) => ({
    margin: `0 ${rem(4)} 0 0`,
    display: 'inline',
    verticalAlign: 'baseline',
    color: theme.header.primary,
    fontSize: rem(16),
    fontWeight: 500,
    lineHeight: rem(22),
    wordWrap: 'break-word',
    cursor: 'pointer',
    ...(theme.appearance.display === 'compact' && {
        marginRight: rem(8)
    }),
    ...(theme.appearance.color === 'light' && {
        fontWeight: 600
    })
}));

const BotTag = styled('span')(({ theme }) => ({
    minHeight: em(20.4),
    maxHeight: em(20.4),
    margin: `${em(1.2)} ${rem(4)} 0 0`,
    padding: `${rem(1.15)} ${rem(4.4)}`,
    position: 'relative',
    top: rem(-1.6),
    color: DiscordDarkPalette.header.primary,
    fontSize: em(10),
    fontWeight: 500,
    lineHeight: 1.3,
    verticalAlign: 'baseline',
    textTransform: 'uppercase',
    background: theme.discord.primary,
    borderRadius: 3
}));

export interface MessageHeaderProps {
    username?: string;
    avatarUrl?: string;
    timestamp?: Date;
    badge?: string | null;
}

export const MessageHeader = ({ username, avatarUrl, timestamp, badge }: MessageHeaderProps) => {
    const theme = useTheme();

    let info = [
        <Username key="username">{username}</Username>,
        badge && <BotTag key="badge">{badge ?? 'Bot'}</BotTag>,
        <Clock key="clock" timestamp={timestamp} />
    ];

    if (theme.appearance.display === 'compact')
        info = info.reverse();

    return (
        <Container>
            {theme.appearance.display === 'cozy' && <Avatar src={avatarUrl} alt="User avatar" />}
            {info}
        </Container>
    );
};
