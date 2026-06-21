import "../styles/Card.css";

export default function Card({ card, onClick }) {
  return (
    <div className="card" onClick={() => onClick(card.id)}>
      <img src={card.url} alt="memory card" />
    </div>
  );
}
