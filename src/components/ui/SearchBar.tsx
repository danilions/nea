// src/components/ui/SearchBar.tsx
import React from 'react';

interface SearchBarProps {
  // eslint-disable-next-line no-unused-vars
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <input
      type="text"
      onChange={handleChange}
      placeholder={placeholder || 'Search...'}
      className="px-3 py-2 border rounded w-full focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Search"
    />
  );
};
