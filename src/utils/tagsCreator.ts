export function tagsCreator(text: string) {

    return text.split(' ').filter((el) => el[0] === '#' && el.length > 1);

}