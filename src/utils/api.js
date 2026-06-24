export async function fetchPokemon(id) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
	const data = await res.json();

	return {
		id: data.id,
		name: data.name,
		url: data.sprites.front_default,
	};
}

export async function fetchPokemonList(count) {
	const ids = Array.from({ length: count }, (_, i) => i + 1);
	const results = await Promise.all(ids.map(fetchPokemon));

	return results;
}
