import { CSSProperties, ReactNode } from 'react';

export interface BaseProps {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
}

export * from './Message';
