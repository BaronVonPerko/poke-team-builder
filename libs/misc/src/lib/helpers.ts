export function getIdFromUrl(url: string) {
    return parseInt(url.split('/').slice(-2)[0]);
}

export function getUrlFromId(id: string) {
    return `https://pokeapi.co/api/v2/pokemon/${id}/`;
}
