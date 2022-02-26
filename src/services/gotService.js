export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter)
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllHouses() {
        const res = await this.getResource('/houses');
        return res.map(this._tranformHouse);
    }
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}`);
        return this._tranformHouse(house);
    }

    async getAllBooks() {
        const res = await this.getResource('/books');
        return res.map(this._tranformBook);
    }
    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._tranformBook(book);
    }

    _transformCharacter(char) {
        function isSet(data) {
            if(data) {
                return data;
            } else {
                return 'no data :('
            }
        }
        return {
            name: isSet(char.name),
            gender: isSet(char.gender),
            born: isSet(char.born),
            deid: isSet(char.deid),
            culture: isSet(char.culture)
        }
    }

    _tranformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        }
    }

    _tranformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        }
    }

}

/* const got = new GotService;

got.getAllCharacters()
    .then(res => {
        res.forEach(item => console.log(item.name))
    });

got.getCharacter(130)
    .then(res => console.log(res)); */