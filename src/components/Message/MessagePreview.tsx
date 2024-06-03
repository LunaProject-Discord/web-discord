import styled from '@emotion/styled';
import dynamic from 'next/dynamic';
import { rem } from 'polished';
import React from 'react';
import { Message } from '../../interfaces';
import { getTextDirection, Markdown, markdownContainerClasses } from '../../markdown';
import type { AttachmentProps } from './Attachment';
import { MessageHeader } from './MessageHeader';
import { RichEmbed } from './RichEmbed';

const Attachment = dynamic<AttachmentProps>(async () =>
    import('./Attachment/Attachment').then(module => module.Attachment)
);

const Container = styled('div')(({ theme }) => ({
    ...(theme.appearance.display === 'cozy' && {
        minHeight: rem(44),
        padding: `${rem(2)} 16px ${rem(2)} ${rem(72)}`,
        ...(theme.appearance.fontSize > 16 && {
            paddingLeft: 72
        }),
        '& + &': {
            marginTop: rem(16)
        },
        '@media (max-width: 575.95px)': {
            paddingLeft: 16
        }
    }),
    ...(theme.appearance.display === 'compact' && {
        minHeight: rem(22),
        padding: `${rem(2)} ${rem(16)} ${rem(2)} 80px`,
        textIndent: `calc(${rem(16)} - 80px)`,
        [`& .${markdownContainerClasses.root}`]: {
            display: 'inline',
            textIndent: 0
        }
    })
}));

const Content = styled(Markdown)<{ direction: 'neutral' | 'ltr' | 'rtl' }>(({ theme, direction }) => ({
    textIndent: 0,
    ...(theme.appearance.display === 'cozy' && direction === 'rtl' && {
        textAlign: 'left',
        unicodeBidi: 'plaintext'
    })
}));

const ExtrasContainer = styled('div')({
    padding: `${rem(2)} 0`,
    display: 'grid',
    gridAutoFlow: 'row',
    rowGap: rem(4),
    textIndent: 0,
    '& > *': {
        alignSelf: 'start',
        justifySelf: 'start'
    }
});

export interface MessagePreviewProps {
    message: Message;
}

export const MessagePreview = ({ message }: MessagePreviewProps) => (
    <Container>
        <MessageHeader
            username={message.author.name}
            avatarUrl={message.author.avatarUrl}
            timestamp={message.timestamp}
            badge={message.author.badge}
        />
        {message.content.length > 0 && <Content
            direction={getTextDirection(message.content)}
            content={message.content}
            type="message-content"
        />}
        {(message.attachments.length > 0 || message.embeds.length > 0) && (
            <ExtrasContainer>
                {message.attachments.map((attachment) => (
                    <Attachment
                        key={JSON.stringify(attachment.name)}
                        file={attachment}
                    />
                ))}
                {message.embeds.map((embed, i) => (
                    <RichEmbed key={`Embed ${i}`} embed={embed} />
                ))}
            </ExtrasContainer>
        )}
    </Container>
);
