export const lastday = (y: number, m : number) => {
    return  new Date(y, m +1, 0).getTime();
}