"use client";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTours } from "@/utils/action";
import ToursList from "./ToursList";

const ToursPage = () => {
  const [searchValue, setSearchValue] = useSate("");
  const { data, isPending } = useQuery({
    queryKey: ["tours", searchValue],
    queryFn: () => getAllTours(),
  });

  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input 
            type="text" 
            placeholder="Enter city or country here..."
            className="input input-boarded join-item w-full"
            value={searchValue} 
            onChange={(e) => setSearchValue(e.target.value)}
            required
          />
          <button 
            type="button"
            className="btn btn-primary join-item"
            disabled={isPending}
            onClick={() => setSearchValue("")}
          >
            {isPending ? "Please wait...": "Reset"}
          </button>
        </div>
      </form>
      {isPending ? <span className="loading"></span> : <ToursList data={data} />}
    </>
  );
};

export default ToursPage