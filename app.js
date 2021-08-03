//DOM Elements
const pkmnList = document.getElementById("pkmn_list"),
	searchName = document.getElementById("searchName"),
	searchType = document.getElementById("searchType");

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

//Search
searchName.addEventListener("keyup", (e) => {
	let searchInput = searchName.value;
	doSearch(searchInput, ".pkmn-name");
	e.preventDefault();
});

searchType.addEventListener("keyup", (e) => {
	let searchInput = searchType.value;
	doSearch(searchInput, ".li-value");
	e.preventDefault();
});

function doSearch(value, target) {
	let searchList = document.querySelectorAll(target);
	searchList.forEach((item) => {
		console.log(item.parentElement.textContent);
		if (target === ".pkmn-name") {
			if (item.textContent.toLowerCase().indexOf(value.toLowerCase()) > -1) {
				item.parentElement.parentElement.style.display = "block";
			} else {
				item.parentElement.parentElement.style.display = "none";
			}
		}
		if (target === ".li-value" && item.parentElement.textContent.indexOf("Type") > -1) {
			if (item.textContent.toLowerCase().indexOf(value.toLowerCase()) > -1) {
				item.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
					"block";
			} else {
				item.parentElement.parentElement.parentElement.parentElement.parentElement.style.display =
					"none";
			}
		}
	});
}

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
	// console.log(pokeDex);
}

//Create HTML Card

function createCard(currentPkmn) {
	const listItem = document.createElement("li"),
		card = document.createElement("div");

	const name = currentPkmn.name[0].toUpperCase() + currentPkmn.name.slice(1);
	const color = colours[currentPkmn.types[0].type.name];
	card.className = "pokemon_card";
	card.dataset.pkmnId = currentPkmn.id;
	card.innerHTML = `
		<div class="hover-overlay">
			<h2 style='color:${color}'>${name}</h2>
			<ul>
				<li>Pokemon ID:<span class='li-value'>		#${currentPkmn.id.toString().padStart(3, "0")}</span></li>
				<li>Height:<span class='li-value'>		${currentPkmn.height / 10}m</span></li>
				<li>Weight:<span class='li-value'>		${currentPkmn.weight / 10}Kg</span></li>
				<li>Type:<span class='li-value'>		${
					currentPkmn.types[0].type.name[0].toUpperCase() +
					currentPkmn.types[0].type.name.slice(1)
				}</span></li>
				<li>Base XP:<span class='li-value'>	${currentPkmn.base_experience} points</span></li>
			</ul>
		</div>
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
	card.style.backgroundColor = color;
	// console.log("color" + currentPkmn.types[0].type.name);
	listItem.appendChild(card);
	pkmnList.appendChild(listItem);
}

pokemonList(1, 151);
