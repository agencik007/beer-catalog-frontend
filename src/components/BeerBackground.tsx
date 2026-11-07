import './BeerBackground.css';

const BUBBLES = 7;

/**
 * Animowane tło: kropki-bąbelki u góry, a na dole tafla piwa z pianą.
 * Fale to kafelkowane obrazy SVG (CSS background) przesuwane wyłącznie przez transform,
 * więc animacja działa na kompozytorze bez przemalowywania strony.
 */
export function BeerBackground() {
	return (
		<div className="beer-bg" aria-hidden="true">
			<div className="beer-bg__dots">
				<div className="beer-bg__dots-layer" />
			</div>
			<div className="beer-bg__ambient" />

			<div className="beer-bg__pint">
				<div className="beer-bg__wave beer-bg__wave--back" />
				<div className="beer-bg__wave beer-bg__wave--foam" />
				<div className="beer-bg__wave beer-bg__wave--front" />

				<div className="beer-bg__liquid">
					<span className="beer-bg__caustic" />
					{Array.from({ length: BUBBLES }, (_, i) => (
						<span key={i} className="beer-bg__bubble" />
					))}
				</div>
			</div>
		</div>
	);
}
