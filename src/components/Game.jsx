import { useEffect, useState } from "react";
import "../styles/Game.css";
import { shuffle } from "../utils/gameUtils";
import { fetchPokemon, fetchPokemonList } from "../utils/api";
import Card from "./Card";
import Scoreboard from "./Scoreboard";

export default function Game() {
	const [cards, setCards] = useState([]);
	const [pickedCards, setPickedCards] = useState(new Set());
	const [bestScore, setBestScore] = useState(0);
	const hasWon = cards.length > 0 && pickedCards.size === cards.length;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadPokemon() {
			try {
				const results = await fetchPokemonList(8);
				setCards(shuffle(results));
			} finally {
				setLoading(false);
			}
		}

		loadPokemon();
	}, []);

	useEffect(() => {
		if (!hasWon) return;

		alert("You win!");
		resetGame(pickedCards.size);
	}, [hasWon]);

	function handleClick(id) {
		setCards((prev) => shuffle(prev));

		if (pickedCards.has(id)) {
			alert("You lose!");
			resetGame(pickedCards.size);
			return;
		}

		const next = new Set(pickedCards);
		next.add(id);
		setPickedCards(next);
	}

	function resetGame(finalScore) {
		setPickedCards(new Set());
		setBestScore((prev) => Math.max(prev, finalScore));
	}

	return (
		<>
			<Scoreboard score={pickedCards.size} best={bestScore} />

			<div className="description">
				<h1>Pokémon Memory Game</h1>
				<p>
					Click a Pokémon you haven't clicked before. Clicking the same Pokémon
					twice resets your score.
				</p>
			</div>

			{loading ? (
				<div className="loading-state">Loading Pokémon...</div>
			) : (
				<div className="grid">
					{cards.map((card) => (
						<Card key={card.id} card={card} onClick={handleClick} />
					))}
				</div>
			)}
		</>
	);
}
