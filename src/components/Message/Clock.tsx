import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { formatTimestamp } from '@lunaproject/web-core/dist/utils';
import { isValid } from 'date-fns';
import { rem } from 'polished';
import React, { useCallback, useEffect, useState } from 'react';

const Display = styled('span')(({ theme }) => ({
    height: rem(20),
    display: 'inline-block',
    color: theme.text.muted,
    cursor: 'default',
    ...(theme.appearance.display === 'cozy' && {
        marginLeft: rem(4),
        fontSize: rem(12),
        fontWeight: 500,
        lineHeight: rem(22),
        verticalAlign: 'baseline',
        whiteSpace: 'nowrap'
    }),
    ...(theme.appearance.display === 'compact' && {
        width: rem(48),
        marginRight: rem(8),
        fontSize: rem(11),
        lineHeight: rem(22),
        textAlign: 'right',
        textIndent: 0
    })
}));

export interface ClockProps {
    timestamp?: Date;
}

export const Clock = (props: ClockProps) => {
    let { timestamp } = props;
    if (timestamp && !isValid(timestamp))
        timestamp = undefined;

    const theme = useTheme();

    const format = useCallback((date: Date = new Date()) => {
        if (theme.appearance.display === 'compact') {
            return date.toLocaleString(
                'en-US',
                {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true
                }
            );
        }

        return formatTimestamp(date);
    }, [theme.appearance.display]);

    const [displayedTime, setDisplayedTime] = useState(() => format(timestamp));

    useEffect(() => {
        if (!timestamp) {
            const interval = setInterval(() => setDisplayedTime(format()), 1000);
            return () => clearInterval(interval);
        }

        setDisplayedTime(format(timestamp));
    }, [format, timestamp]);

    return (<Display>{displayedTime}</Display>);
};
