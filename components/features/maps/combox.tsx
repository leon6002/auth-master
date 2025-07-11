"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Search } from "./search";
import { LocationTip } from "@/types/api-map-types";

const POPOVER_WIDTH = "w-[250px]";

interface ComboboxProps {
  placeholder: string;
  selected: LocationTip | undefined;
  setSelected: (locationtip: LocationTip | undefined) => void;
}

export function Combobox({
  placeholder,
  selected,
  setSelected,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const handleSetActive = React.useCallback(
    (locationTip: LocationTip) => {
      setSelected(locationTip);

      // OPTIONAL: close the combobox upon selection
      setOpen(false);
    },
    [setSelected],
  );

  const displayName = selected ? selected.name : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn("justify-between", POPOVER_WIDTH)}
        >
          {displayName}

          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent side="bottom" className={cn("p-0", POPOVER_WIDTH)}>
        <Search selectedResult={selected} onSelectResult={handleSetActive} />
      </PopoverContent>
    </Popover>
  );
}
