import Color from 'color';

export interface Message {
    content: string;
    attachments: File[];
    embeds: Embed[];
    author: MessageAuthor;
    timestamp: Date;
}

export interface MessageAuthor {
    name: string;
    avatarUrl: string;
    badge?: string | null;
}

export interface Embed {
    _id?: string;
    title: string;
    description: string;
    url: string;
    color: Color;
    timestamp: Date | null;
    author: EmbedAuthor;
    fields: EmbedField[];
    image: EmbedImage;
    footer: EmbedFooter;
}

export interface EmbedAuthor {
    name: string;
    url: string;
    iconUrl: string;
}

export interface EmbedField {
    name: string;
    value: string;
    inline: boolean;
}

export interface EmbedImage {
    images: string[];
    thumbnail: string;
}

export interface EmbedFooter {
    text: string;
    iconUrl: string;
}

export const DefaultEmbed: Embed = {
    title: '',
    description: '',
    url: '',
    color: Color(0xffffff),
    timestamp: null,
    author: {
        name: '',
        url: '',
        iconUrl: ''
    },
    fields: [],
    image: {
        images: [],
        thumbnail: ''
    },
    footer: {
        text: '',
        iconUrl: ''
    }
};

export const DefaultField: EmbedField = {
    name: '',
    value: '',
    inline: false
};
