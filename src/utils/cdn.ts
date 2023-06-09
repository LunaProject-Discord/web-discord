import { APIGuild, APIUser } from 'discord-api-types/v10';
import { GuildMember, OAuthGuild, OAuthUser } from '../interfaces';

export const CDN_BASE_URL = 'https://cdn.discordapp.com';

type CdnImageFormat = 'jpg' | 'png' | 'gif' | 'webp';

export const buildCdnUrl = (path: string, size?: number, format?: CdnImageFormat) => new URL(
    `${path}${format ? `.${format}` : ''}${size ? `?size=${size}` : ''}`,
    CDN_BASE_URL
).toString();

export const getGuildIcon = (guild: OAuthGuild | APIGuild, size?: number, format?: CdnImageFormat) => guild.icon ? buildCdnUrl(
    `/icons/${guild.id}/${guild.icon}`,
    size,
    format
) : buildCdnUrl(
    '/embed/avatars/0',
    undefined,
    'png'
);

export const getMemberAvatar = (member: GuildMember, guild: OAuthGuild | APIGuild | string, size?: number, format?: CdnImageFormat) => member.avatar ? buildCdnUrl(
    `/guilds/${typeof guild === 'object' ? guild.id : guild}/users/${member.user.id}/avatars/${member.avatar}`,
    size,
    format
) : getUserAvatar(
    member.user,
    size,
    format
);

export const getUserAvatar = (user: OAuthUser | APIUser, size?: number, format?: CdnImageFormat) => user.avatar ? buildCdnUrl(
    `/avatars/${user.id}/${user.avatar}`,
    size,
    format
) : buildCdnUrl(
    `/embed/avatars/${Number(user.discriminator) === 0 ? ((BigInt(user.id) >> 22n) % 5n) : Number(user.discriminator) % 5}`,
    undefined,
    'png'
);
