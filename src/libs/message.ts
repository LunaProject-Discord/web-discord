import { Embed, EmbedField } from '../interfaces';

const MAX_FIELDS_PER_ROW = 3;
const FIELD_GRID_SIZE = 12;

export const getFieldGridColumn = (field: EmbedField, embed: Embed): string => {
    const fields = embed.fields ?? [];
    const fieldIndex = fields.indexOf(field);

    if (!field.inline)
        return `1 / ${FIELD_GRID_SIZE + 1}`;

    let startingField = fieldIndex;
    while (startingField > 0 && fields[startingField - 1].inline)
        startingField -= 1;

    let totalInlineFields = 0;
    while (fields.length > startingField + totalInlineFields && fields[startingField + totalInlineFields].inline)
        totalInlineFields += 1;

    const indexInSequence = fieldIndex - startingField;
    const currentRow = indexInSequence / MAX_FIELDS_PER_ROW;
    const indexOnRow = indexInSequence % MAX_FIELDS_PER_ROW;
    const totalOnLastRow = totalInlineFields % MAX_FIELDS_PER_ROW || MAX_FIELDS_PER_ROW;
    const fullRows = (totalInlineFields - totalOnLastRow) / MAX_FIELDS_PER_ROW;
    const totalOnRow = currentRow >= fullRows ? totalOnLastRow : MAX_FIELDS_PER_ROW;

    const columnSpan = FIELD_GRID_SIZE / totalOnRow;
    const start = indexOnRow * columnSpan + 1;
    const end = start + columnSpan;

    return `${start} / ${end}`;
};
