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

	useEffect(() => {
		async function loadPokemon() {
			const results = await fetchPokemonList(8);
			setCards(shuffle(results));
			console.log(results);
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
			<div className="grid">
				{cards.map((card) => (
					<Card key={card.id} card={card} onClick={handleClick} />
				))}
			</div>
		</>
	);
}
