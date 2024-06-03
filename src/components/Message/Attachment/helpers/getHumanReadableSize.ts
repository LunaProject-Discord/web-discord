export const getHumanReadableSize = (bytes: number) => {
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    let unit = 0;
    let num = bytes;

    while (num >= 1024 && unit < units.length - 1) {
        unit += 1;
        num /= 1024;
    }

    const formattedNumber = num.toLocaleString('en-US', {
        maximumFractionDigits: 2
    });

    return `${formattedNumber} ${units[unit]}`;
};
