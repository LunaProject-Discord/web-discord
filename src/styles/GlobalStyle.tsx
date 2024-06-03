import { css, Global, useTheme } from '@emotion/react';
import { fontFace, size } from 'polished';
import React from 'react';

import DarkResizer from '../../static/resizer-dark.svg';
import LightResizer from '../../static/resizer-light.svg';

export const GlobalStyle = () => {
    const theme = useTheme();

    return (
        <Global
            styles={css`
                ${[300, 400, 500, 600, 700].map(weight =>
                    fontFace({
                        fontFamily: 'Whitney',
                        fontStyle: 'normal',
                        fontWeight: String(weight),
                        fontFilePath: `/static/whitney-${weight}`,
                        fileFormats: ['woff2', 'woff'],
                        fontDisplay: 'swap'
                    })
                )};

                html,
                body {
                    padding: 0;
                    margin: 0;
                    background: ${theme.background.primary};

                    line-height: 1;
                    color: ${theme.text.normal};
                    font-family: ${theme.font.sans};
                    font-size: ${theme.appearance.fontSize}px;

                    text-rendering: optimizeLegibility;
                    text-size-adjust: 100%;

                    height: 100%;
                    overflow: hidden;
                }

                button,
                input,
                textarea {
                    font-family: inherit;
                }

                #app,
                #__next {
                    height: 100%;
                }

                pre,
                code {
                    font-family: ${theme.font.mono};
                }

                a {
                    color: ${theme.text.link};

                    text-decoration: none;

                    &:hover {
                        text-decoration: underline;
                    }
                }

                img {
                    text-indent: 100%;
                    white-space: nowrap;
                    overflow: hidden;
                }

                * {
                    box-sizing: border-box;

                    -webkit-tap-highlight-color: transparent;

                    scrollbar-color: ${theme.scrollbar.auto.thumb} ${theme.scrollbar.auto.track};
                    scrollbar-width: auto;

                    &::-webkit-scrollbar {
                        ${size(16)};
                    }

                    &::-webkit-scrollbar-corner {
                        background-color: transparent;
                    }

                    &::-webkit-scrollbar-thumb {
                        background-color: ${theme.scrollbar.auto.thumb};
                        border: 4px solid transparent;
                        border-radius: 8px;
                        min-height: 40px;
                        background-clip: padding-box;
                    }

                    &::-webkit-scrollbar-track {
                        background-color: ${theme.scrollbar.auto.track};
                        border: 4px solid transparent;
                        border-radius: 8px;
                        margin-bottom: 8px;
                        background-clip: padding-box;
                    }

                    &::-webkit-scrollbar-corner {
                        background-color: transparent;
                    }

                    &::-webkit-resizer {
                        background-image: url(${theme.appearance.color === 'dark' ? DarkResizer : LightResizer});
                        background-repeat: no-repeat;
                        background-position: bottom right;
                    }
                }
            `}
        />
    );
};
