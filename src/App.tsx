import "./styles/App.css";
import { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import PinCard from "./components/PinCard";
import type { Pin } from "./types/Pin";
import { PinService } from "./services/PinService";
import PinModal from "./components/PinModal";

function App() {
  const pinService = new PinService();

  const [pins, setPins] = useState<Pin[]>(() => {
    const savedPins = localStorage.getItem("pins");

    if (savedPins) {
      return JSON.parse(savedPins);
    }

    return pinService.getAll();
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPin, setEditingPin] = useState<Pin | null>(null);

  const toggleFavorite = (id: number) => {
    setPins((currentPins) =>
      currentPins.map((pin) =>
        pin.id === id ? { ...pin, isFavorite: !pin.isFavorite } : pin
      )
    );
  };

  const addPin = (newPin: Pin) => {
    setPins((currentPins) => [...currentPins, newPin]);
  };

  const editPin = (pin: Pin) => {
    setEditingPin(pin);
    setIsModalOpen(true);
  };

  const updatePin = (updatedPin: Pin) => {
    setPins((currentPins) =>
      currentPins.map((pin) => (pin.id === updatedPin.id ? updatedPin : pin))
    );
  };

  // TODO: adjust modal
  const deletePin = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this pin?"
    );

    if (!confirmed) return;

    setPins((currentPins) => currentPins.filter((pin) => pin.id !== id));
  };

  useEffect(() => {
    localStorage.setItem("pins", JSON.stringify(pins));
  }, [pins]);

  const filteredPins = pins.filter(
    (pin) =>
      pin.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pin.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onAddPin={() => {
          console.log("Button clicked");
          setIsModalOpen(true);
        }}
      />
      <main className="container">
        <div className="pins-grid">
          {filteredPins.map((pin) => (
            <PinCard
              key={pin.id}
              pin={pin}
              onFavorite={toggleFavorite}
              onEdit={editPin}
              onDelete={deletePin}
            />
          ))}
        </div>
      </main>

      <PinModal
        key={editingPin?.id ?? "new"}
        isOpen={isModalOpen}
        onClose={() => {
          setEditingPin(null);
          setIsModalOpen(false);
        }}
        onSave={(pin) => {
          if (editingPin) {
            updatePin(pin);
          } else {
            addPin(pin);
          }

          setEditingPin(null);
        }}
        editingPin={editingPin}
      />
    </>
  );
}

export default App;
