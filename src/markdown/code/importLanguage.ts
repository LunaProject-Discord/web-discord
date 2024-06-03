import { infoWithName, successWithName } from '@lunaproject/web-core/dist/utils';
import hljs from 'highlight.js';
import { getLanguageFromAlias } from './getLanguageFromAlias';

const importRawLanguage = async (name: string) =>
    import(`highlight.js/lib/languages/${name}`).then(
        module => module.default as (hljs?: HLJSApi) => LanguageDetail
    );

export const importLanguage = async (alias: string) => {
    const language = getLanguageFromAlias(alias);
    if (!language) return;

    infoWithName('Markdown', language);

    if (language.dependencies) {
        await Promise.all(
            language.dependencies.map(async dependency => {
                await importLanguage(dependency);
            })
        );
    }

    hljs.registerLanguage(language.name, await importRawLanguage(language.name));

    if (typeof window !== 'undefined') {
        successWithName('Markdown', 'Registered highlight.js language:', language.name);
    }
};
