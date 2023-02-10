import { APIGuild, APIRole } from 'discord-api-types/v10';
import { APIGuildChannel, OAuthGuild, OAuthUser } from '../interfaces';

export const CDN_BASE_URL = 'https://cdn.discordapp.com';

type CdnImageFormat = 'jpg' | 'png' | 'gif' | 'webp';

export const buildCdnUrl = (path: string, size?: number, format?: CdnImageFormat) => new URL(
    `${path}${format ? `.${format}` : ''}${size ? `?size=${size}` : ''}`,
    CDN_BASE_URL
).toString();

export const getUserAvatar = (user: OAuthUser, size?: number, format?: CdnImageFormat) => user.avatar ? buildCdnUrl(
    `/avatars/${user.id}/${user.avatar}`,
    size,
    format
) : buildCdnUrl(
    `/embed/avatars/${Number(user.discriminator) % 5}`,
    undefined,
    'png'
);

export const getGuildIcon = (guild: OAuthGuild | APIGuild, size?: number, format?: CdnImageFormat) => guild.icon ? buildCdnUrl(
    `/icons/${guild.id}/${guild.icon}`,
    size,
    format
) : buildCdnUrl(
    '/embed/avatars/0',
    undefined,
    'png'
);

export const hasPermission = (guild: OAuthGuild | APIGuild, permission: number = 0x20) => guild.owner || (Number(guild.permissions) & permission) === permission;

export const sortOAuthGuilds = (guilds: OAuthGuild[]) => (guilds?.slice() ?? []).sort((a, b) => a.name.localeCompare(b.name));

export const sortGuilds = (guilds: APIGuild[]) => (guilds?.slice() ?? []).sort((a, b) => a.name.localeCompare(b.name));

export const sortChannels = (channels: APIGuildChannel[]) => (channels?.slice() ?? []).sort((a, b) => a.position - b.position);

export const sortRoles = (roles: APIRole[]) => (roles?.slice() ?? []).sort((a, b) => b.position - a.position);

export const filterPredicateChannel = (channel: APIGuildChannel, keyword: string) => keyword.length < 1 || channel.id.includes(keyword) || channel.name.toLowerCase().includes(keyword.toLowerCase());

export const filterPredicateRole = (role: APIRole, keyword: string) => keyword.length < 1 || role.id.includes(keyword) || role.name.toLowerCase().includes(keyword.toLowerCase());
