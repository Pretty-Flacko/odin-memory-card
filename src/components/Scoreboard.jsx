import "../styles/Scoreboard.css";

export default function Scoreboard({ score, best }) {
	return (
		<div className="scoreboard">
			<p>Score: {score}</p>
			<p>Best: {best}</p>
		</div>
	);
}
