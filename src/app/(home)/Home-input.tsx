"use client";
import { useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { useSearchParam } from "@/hooks/use-search";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HomeInput() {
  const [search, setSearch] = useSearchParam();
  const [inputValue, setInputValue] = useState("");

  const handleSumbit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(inputValue);
  };

  return (
    <div className='flex-1 flex items-center justify-center'>
      <form
        onSubmit={handleSumbit}
        className='relative max-w-[700px] w-full h-full flex items-center gap-2'
      >
        <Input
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder='Search...'
          className='size-full p-2'
        />
        <Button className='' type='submit'>
          <SearchIcon />
        </Button>
        {inputValue && (
          <Button
            onClick={() => {
              setInputValue("");
              setSearch("");
            }}
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
}
