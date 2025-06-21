"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText: React.FC<MultiTextProps> = ({
  placeholder,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addValue = (item: string) => {
    const trimmedItem = item.trim();
    if (trimmedItem && !value.includes(trimmedItem)) {
      onChange(trimmedItem);
    }
    setInputValue("");
  };

  return (
    <div className="space-y-3">
      <Input
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addValue(inputValue);
          }
        }}
        className="w-full border-border bg-input"
      />
      
      {value.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {value.map((item, index) => (
            <Badge
              variant="secondary"
              key={index}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1.5 text-sm inline-flex items-center gap-2 transition-colors"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => onRemove(item)}
                className="hover:text-destructive transition-colors rounded-full hover:bg-destructive/10 p-0.5 -mr-1"
                aria-label={`Remove ${item}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiText;
