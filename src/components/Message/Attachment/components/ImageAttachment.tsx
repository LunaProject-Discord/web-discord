import styled from '@emotion/styled';
import React, { useLayoutEffect, useState } from 'react';
import { DefaultAttachment } from './DefaultAttachment';

const Image = styled('img')({
    maxWidth: 400,
    maxHeight: 300,
    display: 'block',
    cursor: 'pointer',
    borderRadius: 3
});

export interface ImageAttachmentProps {
    file: File;
}

export const ImageAttachment = ({ file }: ImageAttachmentProps) => {
    const [objectUrl, setObjectUrl] = useState('');
    useLayoutEffect(() => {
        const url = URL.createObjectURL(file);
        setObjectUrl(url);

        return () => {
            if (url)
                URL.revokeObjectURL(url);
        };
    }, [file]);

    const [errored, setErrored] = useState(false);
    useLayoutEffect(() => setErrored(false), [objectUrl]);

    if (errored)
        return (<DefaultAttachment file={file} type="image" />);

    return (<Image src={objectUrl} alt={file.name} onError={() => setErrored(true)} />);
};
