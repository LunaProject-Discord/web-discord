import 'discord-api-types';

declare module 'discord-api-types/payloads/v10' {
    interface APIUser {
        global_name: string | null;
    }
}
