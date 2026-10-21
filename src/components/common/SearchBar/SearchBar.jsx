import "./SearchBar.css";
import { FiSearch } from "react-icons/fi";

const SearchBar = ({
  placeholder = "Search...",
  value,
  onChange,
}) => {
  return (
    <div className="search-bar">
      <FiSearch className="search-icon" />

      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchBar;