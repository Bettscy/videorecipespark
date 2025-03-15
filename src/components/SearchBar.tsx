
import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search ingredients (e.g., chicken, pasta, avocado)" 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus search bar when user presses "/" key
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <form 
      onSubmit={handleSearch} 
      className={`relative w-full max-w-2xl mx-auto transition-all duration-300 ease-in-out ${
        isFocused ? 'scale-[1.02]' : 'scale-100'
      }`}
    >
      <div className="relative">
        <div className={`absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none transition-opacity ${
          query ? 'opacity-0' : 'opacity-100'
        }`}>
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
        <input
          ref={inputRef}
          type="search"
          className="block w-full p-4 pl-12 bg-white/80 dark:bg-black/50 backdrop-blur-lg border border-gray-200/30 dark:border-gray-700/30 rounded-2xl shadow-lg focus:ring-2 focus:ring-primary/20 focus:border-primary/20 transition-all duration-300"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search ingredients"
        />
        <button
          type="submit"
          className={`absolute right-3 bottom-3 top-3 px-4 bg-primary text-primary-foreground rounded-xl transition-all duration-300 hover:bg-primary/90 focus:ring-2 focus:ring-primary/20 ${
            query ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          Search
        </button>
      </div>
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs text-muted-foreground opacity-60">
        Press / to focus
      </div>
    </form>
  );
};

export default SearchBar;
