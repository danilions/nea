import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface AppSearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  ariaLabel?: string;
}

const AppSearchBar = React.memo(({ onSearch, placeholder = "Search...", ariaLabel = "Enter search query" }: AppSearchBarProps) => {
  const [query, setQuery] = useState<string>('');

  const handleSearch = useCallback(() => {
    onSearch(query);
  }, [onSearch, query]);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

  return (
    <div className="relative w-full max-w-sm pointer-events-auto">
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-3 pl-10 bg-gray-800 text-white rounded-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
        aria-label={ariaLabel}
      />
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <motion.button
        onClick={handleSearch}
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-200 transition-colors duration-200"
        aria-label="Perform search"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
    </div>
  );
});
AppSearchBar.displayName = 'AppSearchBar';

export default AppSearchBar;
