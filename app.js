//DOM Elements
const pkmnList = document.getElementById("pkmn_list");

const pokeDex = {};
const colours = {
	normal: "#A8A77A",
	fire: "#EE8130",
	water: "#6390F0",
	electric: "#F7D02C",
	grass: "#7AC74C",
	ice: "#96D9D6",
	fighting: "#C22E28",
	poison: "#A33EA1",
	ground: "#E2BF65",
	flying: "#A98FF3",
	psychic: "#F95587",
	bug: "#A6B91A",
	rock: "#B6A136",
	ghost: "#735797",
	dragon: "#6F35FC",
	dark: "#705746",
	steel: "#B7B7CE",
	fairy: "#D685AD",
};

//Fetch Pokemon
async function fetchPokemon(id, callback) {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pkmn = await res.json();
	pokeDex[pkmn.id] = pkmn;
	callback(pkmn);
}

async function pokemonList(from, to) {
	for (let i = from; i <= to; i++) {
		await fetchPokemon(i, createCard);
	}
	console.log(pokeDex);
}

//Create HTML Card

function createCard(currentPkmn) {
	const listItem = document.createElement("li"),
		card = document.createElement("div");

	const name = currentPkmn.name[0].toUpperCase() + currentPkmn.name.slice(1);
	card.className = "pokemon_card";
	card.dataset.pkmnId = currentPkmn.id;
	card.innerHTML = `
		<div class="hover-overlay"></div>
  	<div class="image_wrapper">
			<img
				src="${currentPkmn.sprites.other["official-artwork"].front_default}"
				alt="Balbasaur"
			/>
		</div>
		<div class="pkmn-name">
			<h1>${name}</h1>
		</div>
  `;
	card.style.backgroundColor = colours[currentPkmn.types[0].type.name];
	console.log("color" + currentPkmn.types[0].type.name);
	listItem.appendChild(card);
	pkmnList.appendChild(listItem);
}

pokemonList(1, 151);
