import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, X } from 'lucide-react';

interface Suggestion {
  value: string;
  label: string;
  [key: string]: any; // Permite outras propriedades como 'produto'
}

interface AutocompleteInputProps {
  value: string;
  onValueChange: (value: string | null, suggestions: Suggestion[]) => void;
  initialLabel?: string;
  fetchSuggestions: (query: string) => Promise<Suggestion[]>;
  placeholder?: string;
  label?: string;
  disabled?: boolean;
}

export const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  value,
  onValueChange,
  initialLabel = '',
  fetchSuggestions,
  placeholder,
  label,
  disabled,
}) => {
  const [query, setQuery] = useState(initialLabel);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setQuery(initialLabel);
  }, [initialLabel, value]);

  const debouncedFetch = useCallback(
    (searchQuery: string) => {
      if (searchQuery.length < 2) {
        setSuggestions([]);
        setIsDropdownOpen(false);
        return;
      }
      setIsLoading(true);
      fetchSuggestions(searchQuery)
        .then((results) => {
          setSuggestions(results);
          setIsDropdownOpen(results.length > 0);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setIsLoading(false));
    },
    [fetchSuggestions]
  );

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query !== initialLabel || !value) {
        debouncedFetch(query);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [query, initialLabel, value, debouncedFetch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (suggestion: Suggestion) => {
    setQuery(suggestion.label);
    onValueChange(suggestion.value, suggestions);
    setIsDropdownOpen(false);
    setActiveIndex(-1);
    // Para o PDV, limpar o input após selecionar
    if (placeholder?.includes('produto')) {
        setTimeout(() => setQuery(''), 0);
        inputRef.current?.blur();
    }
  };

  const handleClear = () => {
    setQuery('');
    onValueChange(null, []);
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isDropdownOpen) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
      } else if (e.key === 'Enter' && activeIndex > -1) {
        e.preventDefault();
        handleSelect(suggestions[activeIndex]);
      } else if (e.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && <label className="text-sm text-gray-600 mb-1 block">{label}</label>}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (value) {
              onValueChange(null, []);
            }
          }}
          onFocus={() => { if (query.length > 1 && suggestions.length > 0) setIsDropdownOpen(true); }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="glass-input pr-16"
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isLoading && <Loader2 size={18} className="animate-spin text-gray-500" />}
          {query && !isLoading && (
            <button type="button" onClick={handleClear} className="text-gray-500 hover:text-gray-800">
              <X size={18} />
            </button>
          )}
        </div>
      </div>
      <AnimatePresence>
        {isDropdownOpen && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-1 bg-glass-50 backdrop-blur-lg border border-white/20 rounded-xl shadow-lg max-h-60 overflow-y-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion.value}
                onClick={() => handleSelect(suggestion)}
                className={`px-4 py-2 cursor-pointer text-sm text-gray-800 transition-colors ${
                  index === activeIndex ? 'bg-blue-100/80' : 'hover:bg-white/30'
                }`}
              >
                {suggestion.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
