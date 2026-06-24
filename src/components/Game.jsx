import { useEffect, useState } from "react";
import "../styles/Game.css";
import Card from "./Card";

export default function Game() {
  const [cards, setCards] = useState([]);
  const [pickedCards, setPickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);
  const [hasWon, setHasWon] = useState(false);

  useEffect(() => {
    async function loadPokemon() {
      const ids = Array.from({ length: 8 }, (_, i) => i + 1);

      const results = await Promise.all(ids.map((id) => fetchPokemon(id)));

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

  async function fetchPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await res.json();

    return {
      id: data.id,
      url: data.sprites.front_default,
    };
  }

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

  function shuffle(array) {
    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }

    return copy;
  }

  function resetGame() {
    setPickedCards([]);
    setHasWon(false);
    setCards([]);
    setBestScore((prev) => Math.max(prev, pickedCards.length));
  }

  return (
    <>
      <div className="scoreboard">
        <p>Score: {pickedCards.length}</p>
        <p>Best: {bestScore}</p>
      </div>

      <div className="grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClick={handleClick} />
        ))}
      </div>
    </>
  );
}
