import "../styles/PinCard.css";
import type { Pin } from "../types/Pin";

interface PinCardProps {
  pin: Pin;
  onFavorite: (id: number) => void;
  onEdit: (pin: Pin) => void;
  onDelete: (id: number) => void;
}

function PinCard({ pin, onFavorite, onEdit, onDelete }: PinCardProps) {
  return (
    <article className="card">
      <div className="image-wrapper">
        <img src={pin.imageUrl} alt={pin.title} />

        <button className="favorite-btn" onClick={() => onFavorite(pin.id)}>
          {pin.isFavorite ? "❤️" : "🤍"}
        </button>
        <button className="edit-btn" onClick={() => onEdit(pin)}>
          ✏️
        </button>
        <button className="delete-btn" onClick={() => onDelete(pin.id)}>
          🗑️
        </button>
      </div>

      <div className="card-content">
        <h3>{pin.title}</h3>

        <p>{pin.description}</p>

        <p className="author">by {pin.author}</p>
      </div>
    </article>
  );
}

export default PinCard;
