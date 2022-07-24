const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = dcoument.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

async function fetchPokemon(pokemon) {
    const APIresponse = await fetch('https://pokeapi.co/api/v2/${pokemon}');

    if (APIresponse.status = 200) {
        const data = await APIresponse.json()
        return data
    }
} 

const renderPokemon =  async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon)

    if (data) {
    pokemonImage.style.display = 'block'
    pokemonName.innerHTML  = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']

    input.value = '';
    searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Pokémon ainda não descoberto :c';
        pokemonNumber.innerHTML = '';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCasae());
});

buttonPrev.addEventListener('submit', (event) => {
    if (searchPokemon > 1) {
    searchPokemon += 1;
    searchPokemon -= 1; 
    renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('submit', (event) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});
renderPokemon('1');