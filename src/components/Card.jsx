import { useState } from "react";
import "../styles/Card.css";

export default function Card({ card, onClick }) {
	const [loaded, setLoaded] = useState(false);

	return (
		<div className="card" onClick={() => onClick(card.id)}>
			{!loaded && <div className="placeholder">Loading...</div>}
			<img
				src={card.url}
				alt="memory card"
				onLoad={() => setTimeout(() => setLoaded(true), 5000)}
				style={{ display: loaded ? "block" : "none" }}
			/>
			<p>{card.name}</p>
		</div>
	);
}
