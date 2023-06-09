import { APIGuild, APIRole, APIUser } from 'discord-api-types/v10';
import { APIGuildChannel, GuildMember, OAuthGuild, OAuthUser } from '../interfaces';

export * from './cdn';


export const checkPermission = (permissions: string | bigint | undefined, permission: bigint) => (BigInt(permissions ?? 0) & permission) === permission;

export const someCheckPermissions = (guild: OAuthGuild | APIGuild, ...permissions: bigint[]) => guild.owner || permissions.some((permission) => checkPermission(guild.permissions, permission));

export const everyCheckPermissions = (guild: OAuthGuild | APIGuild, ...permissions: bigint[]) => guild.owner || permissions.every((permission) => checkPermission(guild.permissions, permission));


export const getUserDisplayName = (user: OAuthUser | APIUser) => user.global_name ?? user.username;

export const getMemberDisplayName = (member: GuildMember) => member.nick ?? getUserDisplayName(member.user);


export const getRoleColor = (role: APIRole) => {
    const hexColor = role.color.toString(16).padStart(6, '0');
    return `#${hexColor !== '1fffffff' ? hexColor : '99aab5'}`;
};


export const sortGuilds = (guilds: (OAuthGuild | APIGuild)[]) => (guilds?.slice() ?? []).sort((a, b) => a.name.localeCompare(b.name));

export const sortChannels = (channels: APIGuildChannel[]) => (channels?.slice() ?? []).sort((a, b) => a.position - b.position);

export const sortRoles = (roles: APIRole[]) => (roles?.slice() ?? []).sort((a, b) => b.position - a.position);

export const sortMembers = (members: GuildMember[]) => (members?.slice() ?? []).sort((a, b) => (getMemberDisplayName(a)).localeCompare(getMemberDisplayName(b)));


export const filterPredicateGuild = (guild: OAuthGuild | APIGuild, keyword: string) => keyword.length < 1
    || guild.id.includes(keyword)
    || guild.name.toLowerCase().includes(keyword.toLowerCase());

export const filterPredicateChannel = (channel: APIGuildChannel, keyword: string) => keyword.length < 1
    || channel.id.includes(keyword)
    || channel.name.toLowerCase().includes(keyword.toLowerCase());

export const filterPredicateRole = (role: APIRole, keyword: string) => keyword.length < 1
    || role.id.includes(keyword)
    || role.name.toLowerCase().includes(keyword.toLowerCase());

export const filterPredicateMember = (member: GuildMember, keyword: string) => keyword.length < 1
    || member.user.id.includes(keyword)
    || member.user.username.toLowerCase().includes(keyword.toLowerCase())
    || member.user.global_name?.toLowerCase().includes(keyword.toLowerCase())
    || member.user.discriminator.includes(keyword)
    || member.nick?.toLowerCase().includes(keyword.toLowerCase());
