export default interface PokeDetails {
    id: number;
    name: string;
    types: {type: {name: string}}[];
    sprites: {front_default: string};
}