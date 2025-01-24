import { JSX } from 'react';
import type { AttachmentType } from './AttachmentType';
import {
    acrobat,
    ae,
    ai,
    archive,
    audio,
    code,
    document,
    photoshop,
    sketch,
    spreadsheet,
    unknown,
    video,
    webcode
} from './icons';

export const ATTACHMENT_ICONS: Record<AttachmentType, JSX.Element> = {
    acrobat,
    ae,
    ai,
    archive,
    audio,
    code,
    document,
    image: unknown,
    photoshop,
    sketch,
    spreadsheet,
    unknown,
    video,
    webcode
};
