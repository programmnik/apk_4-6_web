export const getDeclension = (
    count: number,
    one: string,
    twoFour: string,
    moreThanFour: string
): string => {
    if (count === 1) return `1 ${one}`;
    if (count >= 2 && count <= 4) return `${count} ${twoFour}`;
    return `${count} ${moreThanFour}`;
};