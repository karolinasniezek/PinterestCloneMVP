import "../styles/NavBar.css";

interface NavBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddPin: () => void;
}

function NavBar({ searchTerm, onSearchChange, onAddPin }: NavBarProps) {
  return (
    <header className="navbar">
      <div className="logo">Pinterest</div>

      <input
        type="text"
        placeholder="Search inspiration..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />

      <button onClick={onAddPin}>+ Add Pin</button>

      <div className="profile-avatar" title="Your profile" aria-label="Your profile">
        K
      </div>
    </header>
  );
}

export default NavBar;
