import { useState } from "react";
import "../styles/Game.css";
import Card from "./Card";

const initialCards = [
  { id: 1, url: "https://placehold.co/200x200?text=1" },
  { id: 2, url: "https://placehold.co/200x200?text=2" },
  { id: 3, url: "https://placehold.co/200x200?text=3" },
  { id: 4, url: "https://placehold.co/200x200?text=4" },
  { id: 5, url: "https://placehold.co/200x200?text=5" },
  { id: 6, url: "https://placehold.co/200x200?text=6" },
  { id: 7, url: "https://placehold.co/200x200?text=7" },
  { id: 8, url: "https://placehold.co/200x200?text=8" },
];

export default function Game() {
  const [cards, setCards] = useState(() => shuffle(initialCards));
  const [pickedCards, setPickedCards] = useState([]);
  const [bestScore, setBestScore] = useState(0);

  function handleClick(id) {
    if (pickedCards.includes(id)) {
      console.log("Game Over");
      resetGame();
      return;
    }

    setPickedCards((prev) => {
      const updatedCards = [...prev, id];
      return updatedCards;
    });

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
    setCards(() => shuffle(initialCards));

    setBestScore((prev) => Math.max(prev, pickedCards.length));
    setScore(0);
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
