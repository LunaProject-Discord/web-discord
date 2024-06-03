import styled from '@emotion/styled';

export const UnorderedList = styled('ul')({
    margin: '4px 0 0 16px',
    listStylePosition: 'outside',
    listStyleType: 'disc'
});

export const OrderedList = styled(UnorderedList.withComponent('ol'))({
    marginLeft: 'calc(.4em + .6em * var(--totalCharacters))',
    listStyleType: 'decimal'
});

export const ListItem = styled('li')({
    marginBottom: 4,
    whiteSpace: 'break-spaces'
});
