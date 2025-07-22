export const arrayToString = (arr: string[]) => arr.join(", ");

export const stringToArray = (str: string) =>
  str
    .split(",")
    .map(item => item.trim())
    .filter(Boolean);
