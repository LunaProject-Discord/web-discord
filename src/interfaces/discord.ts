import {
    APIGuildCategoryChannel,
    APIGuildForumChannel,
    APIGuildStageVoiceChannel,
    APIGuildVoiceChannel,
    APINewsChannel,
    APITextChannel,
    APIThreadChannel
} from 'discord-api-types/v10';

export interface OAuthUser {
    id: string;
    username: string;
    discriminator: string;
    avatar?: string;
    avatar_decoration?: string;
    accent_color?: number;
    banner?: string;
    banner_color?: string;
    locale?: string;
    bot?: boolean;
    system?: boolean;
    verified?: boolean;
    flags?: number;
    public_flags?: number;
    premium_type?: number;
    email?: string;
    mfa_enabled?: boolean;

}

export interface OAuthGuild {
    id: string;
    name: string;
    icon?: string;
    owner?: boolean;
    permissions?: string;
    features?: string[];
}

export declare type APIGuildChannel =
    APIGuildCategoryChannel
    | APITextChannel
    | APIGuildVoiceChannel
    | APINewsChannel
    | APIGuildStageVoiceChannel
    | APIGuildForumChannel
    | APIThreadChannel;
