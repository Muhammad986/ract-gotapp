export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter)
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllHouses = async () => {
        const res = await this.getResource('/houses');
        return res.map(this._tranformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._tranformHouse(house);
    }

    getAllBooks = async () => {
        const res = await this.getResource('/books');
        return res.map(this._tranformBook);
    }
    getBook = async (id) => {
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
            died: isSet(char.died),
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