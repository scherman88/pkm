//DOM Elements
const pkmnList = document.getElementById("pkmn_list");

const pokeDex = {};

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
	card.className = "pokemon_card";
	card.dataset.pkmnId = currentPkmn.id;
	card.innerHTML = `
  <div class="image_wrapper">
			<img
				src="${currentPkmn.sprites.other["official-artwork"].front_default}"
				alt="Balbasaur"
			/>
		</div>
  `;
	listItem.appendChild(card);
	pkmnList.appendChild(listItem);
}

pokemonList(1, 151);
