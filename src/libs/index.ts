import { REST } from '@discordjs/rest';
import { addSeconds } from 'date-fns/addSeconds';
import { APIGuildMember, APIRole, Routes } from 'discord-api-types/v10';
import { APIGuildChannel, Cache, OAuthGuild, OAuthUser } from '../interfaces';

export const RestClient = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN!!);

const cachedUsers = new Map<string, Cache<OAuthUser>>();
const cachedGuilds = new Map<string, Cache<OAuthGuild[]>>();

const cachedGuildChannels = new Map<string, Cache<APIGuildChannel[]>>();
const cachedGuildRoles = new Map<string, Cache<APIRole[]>>();
const cachedGuildMembers = new Map<string, Cache<APIGuildMember[]>>();

export const getUser = async (token: string | undefined): Promise<OAuthUser | undefined> => {
    if (!token)
        return undefined;

    const date = new Date();

    const cached = cachedUsers.get(token);
    if (cached && cached.expired_at > date.getTime())
        return cached.data;

    const res = await fetch(
        'https://discord.com/api/v10/users/@me',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok)
        return cached?.data;

    const data: OAuthUser = await res.json();
    cachedUsers.set(
        token,
        {
            data,
            expired_at: addSeconds(date, 60).getTime()
        }
    );

    return data;
};

export const getGuilds = async (token: string | undefined): Promise<OAuthGuild[]> => {
    if (!token)
        return [];

    const date = new Date();

    const cached = cachedGuilds.get(token);
    if (cached && cached.expired_at > date.getTime())
        return cached.data;

    const res = await fetch(
        'https://discord.com/api/v10/users/@me/guilds',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    if (!res.ok)
        return cached?.data ?? [];

    const data: OAuthGuild[] = await res.json();
    cachedGuilds.set(
        token,
        {
            data,
            expired_at: addSeconds(date, 60).getTime()
        }
    );

    return data;
};

export const getGuildById = async (id: string, token: string | undefined): Promise<OAuthGuild | undefined> => (await getGuilds(token)).find((guild) => guild.id === id);

export const getGuildChannelsById = async (id: string): Promise<APIGuildChannel[] | undefined> => {
    const date = new Date();

    const cached = cachedGuildChannels.get(id);
    if (cached && cached.expired_at > date.getTime())
        return cached.data;

    try {
        const channels = await RestClient.get(Routes.guildChannels(id)) as APIGuildChannel[];

        cachedGuildChannels.set(
            id,
            {
                data: channels,
                expired_at: addSeconds(date, 60).getTime()
            }
        );

        return channels;
    } catch (e) {
        return cached?.data ?? undefined;
    }
};

export const getGuildRolesById = async (id: string): Promise<APIRole[] | undefined> => {
    const date = new Date();

    const cached = cachedGuildRoles.get(id);
    if (cached && cached.expired_at > date.getTime())
        return cached.data;

    try {
        const roles = await RestClient.get(Routes.guildRoles(id)) as APIRole[];

        cachedGuildRoles.set(
            id,
            {
                data: roles,
                expired_at: addSeconds(date, 60).getTime()
            }
        );

        return roles;
    } catch (e) {
        return cached?.data ?? undefined;
    }
};

export const getGuildMembersById = async (id: string): Promise<APIGuildMember[] | undefined> => {
    const date = new Date();

    const cached = cachedGuildMembers.get(id);
    if (cached && cached.expired_at > date.getTime())
        return cached.data;

    try {
        const params = new URLSearchParams({ 'limit': '1000' });

        const members: APIGuildMember[] = [];

        while (true) {
            const guildMembers = await RestClient.get(
                Routes.guildMembers(id),
                { query: params }
            ) as APIGuildMember[];

            members.push(...guildMembers);

            if (guildMembers.length < 1000)
                break;

            const lastMember = guildMembers[guildMembers.length - 1];
            if (lastMember.user)
                params.set('after', lastMember.user.id);
        }

        cachedGuildMembers.set(
            id,
            {
                data: members,
                expired_at: addSeconds(date, 120).getTime()
            }
        );

        return members;
    } catch (e) {
        return cached?.data ?? undefined;
    }
};

export * from './message';
