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
				onLoad={() => setLoaded(true)}
				style={{ display: loaded ? "block" : "none" }}
			/>
			<p>{card.name}</p>
		</div>
	);
}
