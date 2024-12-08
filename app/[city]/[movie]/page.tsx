"use client";
import {useParams} from 'next/navigation';
import Movie from "@/components/movie/movies";
import SearchResult from "@/components/search/searchresult";

interface PageProps {
  params: Promise<Params>;
}

interface Params {
  city: string;
  movie: string;
}

export default function Index() {
  const { city, movie } = useParams();

  if (city === "search") {
    return (
      <>
        <SearchResult movie={movie} />
      </>
    );
  } else {
    return (
      <>
        <Movie movie={movie} city={city} />
      </>
    );
  }
}
