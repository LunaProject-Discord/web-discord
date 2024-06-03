import { SERIALISED_EMOJI_DATA } from './serialisedEmojiData';
import { SKIN_TONES, TONE_NAMES, TONE_NUMBERS } from './skinTones';

// Flag reference:
// + = include ::skin-tone-x
// # = include _tonex
// ! = include _x_skin_tone
// * = skip alias as global

type Emoji = {
    emoji: string
    flags?: string
    aliases: {
        name: string
        flags?: string
    }[]
};

const EMOJI: Emoji[] = SERIALISED_EMOJI_DATA.split('\n').map(line => {
    const [emoji, ...names] = line.split(' ');

    return {
        emoji: emoji.split('/')[0],
        flags: emoji.split('/')[1],
        aliases: names.map(name => ({
            name: name.split('/')[0],
            flags: name.split('/')[1]
        }))
    };
});

const ZWJ = String.fromCodePoint(0x200d);

const MAN = '👨';
const WOMAN = '👩';
const PERSON = '🧑';

const HANDSHAKE = '🤝';

const NAME_TO_EMOJI = new Map<string, string>();
const EMOJI_TO_NAME = new Map<string, string>();

for (const { emoji, flags, aliases } of EMOJI) {
    EMOJI_TO_NAME.set(emoji, aliases[0].name);

    if (flags?.includes('+')) {
        for (const [num, diversity] of Object.entries(TONE_NUMBERS)) {
            EMOJI_TO_NAME.set(emoji + diversity, `${aliases[0].name}_tone${num}`);
        }
    }

    for (const alias of aliases) {
        if (!alias.flags?.includes('*')) {
            NAME_TO_EMOJI.set(alias.name, emoji);
        }

        if (flags?.includes('+')) {
            for (const [num, diversity] of Object.entries(TONE_NUMBERS)) {
                NAME_TO_EMOJI.set(
                    `${alias.name}::skin-tone-${num}`,
                    emoji + diversity
                );
            }
        }

        if (alias.flags?.includes('#')) {
            for (const [id, diversity] of Object.entries(TONE_NUMBERS)) {
                NAME_TO_EMOJI.set(`${alias.name}_tone${id}`, emoji + diversity);
            }
        }

        if (alias.flags?.includes('!')) {
            for (const [num, diversity] of Object.entries(TONE_NAMES)) {
                NAME_TO_EMOJI.set(
                    `${alias.name}_${num}_skin_tone`,
                    emoji + diversity
                );
            }
        }
    }
}

for (const { unicode: toneA, number: numberA, name: nameA } of SKIN_TONES) {
    const idSuffix = `_tone${numberA}`;
    const nameSuffix = `_${nameA}_skin_tone`;
    const toneSuffix = `::skin-tone-${numberA}`;

    const womanAndMan = `👫${toneA}`;
    const womanAndManName = 'woman_and_man_holding_hands';

    EMOJI_TO_NAME.set(womanAndMan, womanAndManName + idSuffix);
    NAME_TO_EMOJI.set(womanAndManName + idSuffix, womanAndMan);
    NAME_TO_EMOJI.set(womanAndManName + nameSuffix, womanAndMan);
    NAME_TO_EMOJI.set(`couple${toneSuffix}`, womanAndMan);

    const men = `👬${toneA}`;
    const menName = 'men_holding_hands';
    EMOJI_TO_NAME.set(men, menName + idSuffix);
    NAME_TO_EMOJI.set(menName + idSuffix, men);
    NAME_TO_EMOJI.set(menName + nameSuffix, men);
    NAME_TO_EMOJI.set(`two_${menName}${toneSuffix}`, men);

    const women = `👭${toneA}`;
    const womenName = 'women_holding_hands';
    EMOJI_TO_NAME.set(women, womenName + idSuffix);
    NAME_TO_EMOJI.set(womenName + idSuffix, women);
    NAME_TO_EMOJI.set(womenName + nameSuffix, women);
    NAME_TO_EMOJI.set(`two_${womenName}${toneSuffix}`, women);

    const people = PERSON + toneA + ZWJ + HANDSHAKE + ZWJ + PERSON + toneA;
    const peopleName = 'people_holding_hands';
    EMOJI_TO_NAME.set(people, peopleName + idSuffix);
    NAME_TO_EMOJI.set(peopleName + idSuffix, people);
    NAME_TO_EMOJI.set(peopleName + nameSuffix, people);
    NAME_TO_EMOJI.set(peopleName + toneSuffix, people);

    for (const { unicode: toneB, number: numberB, name: nameB } of SKIN_TONES) {
        if (numberA <= numberB) continue;

        const skinIdSuffix = `_tone${numberA}_tone${numberB}`;
        const skinNameSuffix = `_${nameA}_skin_tone_${nameB}_skin_tone`;

        const skinWomanAndMan = WOMAN + toneA + ZWJ + HANDSHAKE + ZWJ + MAN + toneB;
        EMOJI_TO_NAME.set(skinWomanAndMan, womanAndManName + skinIdSuffix);
        NAME_TO_EMOJI.set(womanAndManName + skinIdSuffix, skinWomanAndMan);
        NAME_TO_EMOJI.set(womanAndManName + skinNameSuffix, skinWomanAndMan);

        const skinMen = MAN + toneA + ZWJ + HANDSHAKE + ZWJ + MAN + toneB;
        EMOJI_TO_NAME.set(skinMen, menName + skinIdSuffix);
        NAME_TO_EMOJI.set(menName + skinIdSuffix, skinMen);
        NAME_TO_EMOJI.set(menName + skinNameSuffix, skinMen);

        const skinWomen = WOMAN + toneA + ZWJ + HANDSHAKE + ZWJ + WOMAN + toneB;
        EMOJI_TO_NAME.set(skinWomen, womenName + skinIdSuffix);
        NAME_TO_EMOJI.set(womenName + skinIdSuffix, skinWomen);
        NAME_TO_EMOJI.set(womenName + skinNameSuffix, skinWomen);

        const skinPeople = PERSON + toneA + ZWJ + HANDSHAKE + ZWJ + PERSON + toneB;
        EMOJI_TO_NAME.set(skinPeople, peopleName + skinIdSuffix);
        NAME_TO_EMOJI.set(peopleName + skinIdSuffix, skinPeople);
        NAME_TO_EMOJI.set(peopleName + skinNameSuffix, skinPeople);
    }
}

export { NAME_TO_EMOJI, EMOJI_TO_NAME };
