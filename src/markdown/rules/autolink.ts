import { defaultRules } from 'simple-markdown';
import { parseUrl } from '../helpers';
import type { MarkdownRule } from '../parsers';
import { link } from './link';

export const autolink: MarkdownRule = {
    ...defaultRules.autolink,
    parse: parseUrl,
    react: link.react
};
