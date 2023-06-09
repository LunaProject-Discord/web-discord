import { APIGuild, APIRole } from 'discord-api-types/v10';
import { APIGuildChannel, OAuthGuild } from '../interfaces';

export * from './cdn';

export const getRoleColor = (role: APIRole) => {
    const hexColor = role.color.toString(16).padStart(6, '0');
    return `#${hexColor !== '1fffffff' ? hexColor : '99aab5'}`;
};

export const sortOAuthGuilds = (guilds: OAuthGuild[]) => (guilds?.slice() ?? []).sort((a, b) => a.name.localeCompare(b.name));

export const sortGuilds = (guilds: APIGuild[]) => (guilds?.slice() ?? []).sort((a, b) => a.name.localeCompare(b.name));

export const sortChannels = (channels: APIGuildChannel[]) => (channels?.slice() ?? []).sort((a, b) => a.position - b.position);

export const sortRoles = (roles: APIRole[]) => (roles?.slice() ?? []).sort((a, b) => b.position - a.position);

export const filterPredicateChannel = (channel: APIGuildChannel, keyword: string) => keyword.length < 1 || channel.id.includes(keyword) || channel.name.toLowerCase().includes(keyword.toLowerCase());

export const filterPredicateRole = (role: APIRole, keyword: string) => keyword.length < 1 || role.id.includes(keyword) || role.name.toLowerCase().includes(keyword.toLowerCase());
