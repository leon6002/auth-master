"use client";
import * as React from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { LocationTip, LocationTipRes } from "@/types/api-map-types";
import { fetchSuggestions } from "@/lib/location-tips";

interface SearchProps {
  selectedResult?: LocationTip;
  onSelectResult: (locationTip: LocationTip) => void;
}

export function Search({ selectedResult, onSelectResult }: SearchProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearchInput = (value: string) => {
    // console.log(`value is: ${value}`);
    setSearchQuery(value);
  };
  const handleSelectResult = (locationTip: LocationTip) => {
    onSelectResult(locationTip);

    // OPTIONAL: reset the search query upon selection
    // setSearchQuery('');
  };

  return (
    <Command
      shouldFilter={false}
      className="h-auto rounded-lg border border-b-0 shadow-md"
    >
      <CommandInput
        value={searchQuery}
        onValueChange={handleSearchInput}
        placeholder="请输入地点"
      />

      <SearchResults
        query={searchQuery}
        selectedResult={selectedResult}
        onSelectResult={handleSelectResult}
      />
    </Command>
  );
}

interface SearchResultsProps {
  query: string;
  selectedResult: SearchProps["selectedResult"];
  onSelectResult: SearchProps["onSelectResult"];
}

function SearchResults({
  query,
  selectedResult,
  onSelectResult,
}: SearchResultsProps) {
  console.log(`query is: ${query}`);
  const [debouncedSearchQuery] = useDebounce(query, 1000);
  const enabled = !!debouncedSearchQuery;

  console.log(`debounced query is: ${enabled}: ${debouncedSearchQuery}`);

  const {
    data,
    isLoading: isLoadingOrig,
    isError,
  } = useQuery<LocationTipRes>({
    queryKey: ["search:", debouncedSearchQuery],
    queryFn: () => fetchSuggestions(debouncedSearchQuery),
    enabled,
  });
  // console.log(`data is: ${JSON.stringify(data)}`);

  // To get around this https://github.com/TanStack/query/issues/3584
  const isLoading = enabled && isLoadingOrig;

  // if (!enabled) return null;
  return (
    <CommandList>
      {/* TODO: these should have proper loading aria */}
      {isLoading && <div className="p-4 text-sm">搜索地点中...</div>}
      {isError && <div className="p-4 text-sm">Something went wrong</div>}
      {!isError && !isLoading && !data && <div className="p-4 text-sm"></div>}
      {!enabled && <CommandEmpty></CommandEmpty>}

      {data !== undefined &&
        data.tips?.map((item) => {
          return (
            <CommandItem
              key={item.id}
              onSelect={() => onSelectResult(item)}
              value={item.id}
              className="cursor-pointer"
            >
              {/* <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  selectedResult?.id === item.id ? "opacity-100" : "opacity-0",
                )}
              /> */}
              <div className="flex flex-col">
                <div className="text-xs">{item.name}</div>
                <div className="text-[10px] text-muted-foreground">
                  {item.district} {item.address}
                </div>
              </div>
            </CommandItem>
          );
        })}
    </CommandList>
  );
}
