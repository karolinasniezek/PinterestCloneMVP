import type { Pin } from "../types/Pin";
import "../styles/PinModal.css";
import { useState } from "react";

interface PinModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pin: Pin) => void;
  editingPin: Pin | null;
}

function PinModal({ isOpen, onClose, onSave, editingPin }: PinModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState(editingPin?.title ?? "");
  const [description, setDescription] = useState(editingPin?.description ?? "");
  const [author, setAuthor] = useState("");

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setSelectedImage(reader.result as string);
    };

    reader.readAsDataURL(file);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setTitle("");
    setDescription("");
    setAuthor("");

    onClose();
  };

  const handleSave = () => {
    if (!title || !description) {
      alert("Please fill in all fields.");
      return;
    }

    if (!editingPin && (!selectedImage || !author)) {
      alert("Please fill in all fields.");
      return;
    }

    const newPin: Pin = editingPin
      ? {
          ...editingPin,
          title,
          description,
        }
      : {
          id: Date.now(),
          title,
          description,
          author,
          imageUrl: selectedImage!,
          isFavorite: false,
        };
    onSave(newPin);

    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-content">
          <div className="modal-left">
            <h3>{editingPin ? "Current Image" : "Upload Image"}</h3>

            <div className="image-placeholder">
              {selectedImage || editingPin ? (
                <img
                  src={selectedImage ?? editingPin!.imageUrl}
                  alt="Preview"
                  className="preview-image"
                />
              ) : (
                <label className="upload-area">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    hidden
                  />

                  <div className="upload-icon">↑</div>

                  <h4>Click to upload</h4>
                  <p>or drag & drop</p>
                  <span>PNG, JPG up to 20 MB</span>
                </label>
              )}
            </div>
          </div>

          <div className="modal-right">
            <h2>{editingPin ? "Edit Pin" : "Add New Pin"}</h2>

            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Author</label>
              <input
                type="text"
                value={editingPin ? editingPin.author : author}
                onChange={(e) => setAuthor(e.target.value)}
                disabled={!!editingPin}
              />
            </div>

            <div className="modal-actions">
              <button onClick={handleClose}>Cancel</button>

              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PinModal;
