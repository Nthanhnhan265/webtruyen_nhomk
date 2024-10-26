"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const handleSearchSubmit = (e) => {
      e.preventDefault();
      // Thực hiện hành động tìm kiếm với `searchTerm`
      console.log("Searching for:", searchTerm);
    };
  
    return (
      <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="text"
          placeholder="Tìm truyện..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded-l-lg px-4 py-2 focus:outline-none w-50"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </form>
    );
  }