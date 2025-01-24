import styled from '@emotion/styled';
import { generateComponentClasses } from '@lunaproject/web-core/dist/utils';
import clsx from 'clsx';
import { rem } from 'polished';
import React, { ComponentProps } from 'react';
import { Embed, EmbedField as Field } from '../../../interfaces';
import { getFieldGridColumn } from '../../../libs';
import { Markdown, markdownContainerClasses } from '../../../markdown';

export const richEmbedFieldClasses = generateComponentClasses(
    'RichEmbedField',
    [
        'root',
        'nameRoot',
        'name',
        'valueRoot',
        'value'
    ]
);

export const RichEmbedFieldRoot = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedFieldClasses.root, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>({
    minWidth: 0,
    fontSize: rem(14),
    lineHeight: rem(18)
});

export const RichEmbedFieldName = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedFieldClasses.nameRoot, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>(({ theme }) => ({
    minWidth: 0,
    marginBottom: 1,
    fontSize: rem(14),
    fontWeight: 600,
    color: theme.header.primary
}));

export const RichEmbedFieldValue = styled(
    ({ className, ...props }: ComponentProps<'div'>) => (
        <div
            className={clsx(richEmbedFieldClasses.valueRoot, className)}
            {...props}
        />
    )
)<ComponentProps<'div'>>(({ theme }) => ({
    minWidth: 0,
    [`& .${markdownContainerClasses.root}`]: {
        color: theme.text.normal,
        fontSize: rem(14),
        lineHeight: rem(18),
        whiteSpace: 'pre-line'
    }
}));

export interface RichEmbedFieldProps {
    embed: Embed;
    field: Field;
}

export const RichEmbedField = ({ embed, field }: RichEmbedFieldProps) => (
    <RichEmbedFieldRoot style={{ gridColumn: getFieldGridColumn(field, embed) }}>
        <RichEmbedFieldName>
            <Markdown content={field.name} type="embed-header" className={richEmbedFieldClasses.name} />
        </RichEmbedFieldName>
        <RichEmbedFieldValue>
            <Markdown content={field.value} type="embed-content" className={richEmbedFieldClasses.value} />
        </RichEmbedFieldValue>
    </RichEmbedFieldRoot>
);
