import randomColor from 'randomcolor';

export const generateColor = (): string => {
    const color: string = randomColor();
    return color;
};