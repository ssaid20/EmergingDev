import React from 'react'
import { Input } from "../../ui/input"
import { useEffect, useState } from 'react';
import axios from 'axios';

const GlobalSearch = () => {
  const [search, setSearch] = useState('');
  console.log("search", search)

  useEffect(() => {
    if (search) {
      axios.get(`/api/questions/search?q=${search}`)
        .then((response) => {
          // Handle the search results
          console.log(response.data);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    }
  }, [search]);

  return (
    <div className="relative w-full max-w-[600px] max-lg:hidden">
      <div className="background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4">
        <img 
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />

        <Input
          type="text"
          placeholder="Search globally"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="paragraph-regular no-focus placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
      </div>
    </div>
  )
}

export default GlobalSearch
