"use client";

import {
  Command,
  CommandGroup,
  CommandList,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { useState } from "react";
import { Badge } from "../ui/badge";
import { X } from "lucide-react";

interface MultiSelectProps {
  placeholder: string;
  collections: CollectionType[];
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  placeholder,
  collections,
  value,
  onChange,
  onRemove,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);

  let selected: CollectionType[];

  if (value.length === 0) {
    selected = [];
  } else {
    selected = value.map((id) =>
      collections.find((collection) => collection._id === id)
    ) as CollectionType[];
  }

  const selectables = collections.filter(
    (collection) => !selected.includes(collection)
  );

  return (
    <div className="relative">
      <Command className="overflow-visible bg-transparent">
        <div className="flex gap-2 flex-wrap p-3 border border-border rounded-md bg-input min-h-[40px] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          {selected.map((collection) => (
            <Badge 
              key={collection._id}
              variant="secondary"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-2 py-1 text-sm"
            >
              {collection.title}
              <button
                type="button"
                className="ml-2 hover:text-destructive transition-colors rounded-full hover:bg-destructive/10 p-0.5 border-none"
                onClick={() => onRemove(collection._id)}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}

          <CommandInput
            placeholder={placeholder}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            className="flex-1 bg-transparent p-0 border-none placeholder:text-muted-foreground focus:ring-0 focus:ring-offset-0"
          />
        </div>

        {open && selectables.length > 0 && (
          <div className="relative mt-1">
            <CommandList className="absolute z-50 w-full max-h-60 overflow-auto border border-border rounded-md shadow-lg bg-popover text-popover-foreground">
              <CommandGroup>
                {selectables.map((collection) => (
                  <CommandItem
                    key={collection._id}
                    onMouseDown={(e) => e.preventDefault()}
                    onSelect={() => {
                      onChange(collection._id);
                      setInputValue("");
                    }}
                    className="cursor-pointer px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground aria-selected:bg-accent aria-selected:text-accent-foreground transition-colors"
                  >
                    {collection.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </div>
        )}
      </Command>
    </div>
  );
};

export default MultiSelect;
