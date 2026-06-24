import { useEffect, useState } from "react";
import "../styles/Game.css";
import { shuffle } from "../utils/gameUtils";
import { fetchPokemon, fetchPokemonList } from "../utils/api";
import Card from "./Card";
import Scoreboard from "./Scoreboard";

export default function Game() {
	const [cards, setCards] = useState([]);
	const [pickedCards, setPickedCards] = useState([]);
	const [bestScore, setBestScore] = useState(0);
	const [hasWon, setHasWon] = useState(false);

	useEffect(() => {
		async function loadPokemon() {
			const results = await fetchPokemonList(8);
			setCards(shuffle(results));
		}

		loadPokemon();
	}, []);

	useEffect(() => {
		if (hasWon) {
			alert("You win!");
			resetGame();
			setHasWon(false);
		}
	}, [hasWon]);

	function handleClick(id) {
		if (pickedCards.includes(id)) {
			console.log("Game Over");
			resetGame();
			return;
		}

		const updatedCards = [...pickedCards, id];
		setPickedCards(updatedCards);

		if (updatedCards.length === cards.length) {
			setHasWon(true);
			return;
		}

		setCards((prev) => shuffle(prev));
	}

	function resetGame() {
		setPickedCards([]);
		setHasWon(false);
		setCards([]);
		setBestScore((prev) => Math.max(prev, pickedCards.length));
	}

	return (
		<>
			<Scoreboard score={pickedCards.length} best={bestScore} />
			<div className="grid">
				{cards.map((card) => (
					<Card key={card.id} card={card} onClick={handleClick} />
				))}
			</div>
		</>
	);
}
