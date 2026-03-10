'use client';

import { useState } from 'react';
import { FiX } from 'react-icons/fi';

interface TagInputProps {
  label: string;
  value: string[];
  onChange: (tags: string[]) => void;
}

export function TagInput({ label, value, onChange }: TagInputProps) {
  const [input, setInput] = useState('');

  const addTag = () => {
    const tag = input.trim();
    if (tag && !value.includes(tag)) {
      onChange([...value, tag]);
    }
    setInput('');
  };

  const removeTag = (tag: string) => {
    onChange(value.filter((t) => t !== tag));
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-[#1B2A4A] text-white text-xs px-2.5 py-1 rounded-full"
          >
            {tag}
            <button type="button" onClick={() => removeTag(tag)}>
              <FiX size={12} />
            </button>
          </span>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              addTag();
            }
          }}
          placeholder="Type and press Enter"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#FFD11A] focus:border-transparent outline-none"
        />
        <button
          type="button"
          onClick={addTag}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition"
        >
          Add
        </button>
      </div>
    </div>
  );
}
