import styled from '@emotion/styled';

export const HeadingOne = styled('h1')({
    margin: '16px 0 8px',
    fontSize: '1.5rem',
    fontWeight: 700,
    lineHeight: '1.375em',
    '&:first-child': {
        marginTop: 8
    }
});

export const HeadingTwo = styled(HeadingOne.withComponent('h2'))({
    fontSize: '1.25rem'
});

export const HeadingThree = styled(HeadingOne.withComponent('h3'))({
    fontSize: '1rem',
    '&:first-child': {
        marginTop: 4
    }
});
