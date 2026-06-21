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
  const [cards] = useState(initialCards);

  function handleClick(id) {
    console.log("Clicked:", id);
  }

  return (
    <div className="grid">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={handleClick} />
      ))}
    </div>
  );
}
