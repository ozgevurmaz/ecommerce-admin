"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
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
    onChange(item);
    setInputValue("");
  };
  return (
    <>
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
      />
      <div className="space-x-1 space-y-1">
        {value.map((item, index) => (
          <Badge
            key={index}
            className="bg-grey text-white rounded-full"
          >
            {item}
            <Button className="rounded-full hover:text-red-600" onClick={()=> onRemove(item)} size="sm">
              <X className="h-3 w-3"/>
            </Button>
          </Badge>
        ))}
      </div>
    </>
  );
};

export default MultiText;
